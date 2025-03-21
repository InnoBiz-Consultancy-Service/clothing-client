"use client"
import getProducts from '@/apiAction/getProducts';
import ProductCard from '@/components/Shop/ProductCard/ProductCard';
import { ProductCardProps } from '@/types/productProps';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubCategoryPage = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const params = useParams();
    const { category, subCategory } = params;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts({ products: `/products?category=${category}&subcategory=${subCategory}` });
                // console.log(response)
                setProducts(response.products)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [category, subCategory])

    return (
        <div className="container mx-auto mt-4 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    products.map((product) => {
                        const coverImg = Array.isArray(product.images) ? product.images : [];
                        const randomImage = coverImg.length > 0 ? coverImg[Math.floor(Math.random() * coverImg.length)].src : "default.jpg";
                        return (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                title={product.name}
                                price={product.price}
                                imageUrl={randomImage}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SubCategoryPage;