'use client';

import getProducts from '@/apiAction/getProducts';
import ProductCard from '@/components/Shop/ProductCard/ProductCard';
import { ProductCardProps } from '@/types/productProps';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ShopPage = () => {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subcategory');

    const [products, setProducts] = useState<ProductCardProps[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Build the query string based on the presence of category and subcategory
                let queryString = "/products?";
                if (category) {
                    queryString += `category=${category}`;
                }
                if (subCategory) {
                    queryString += `${category ? "&" : ""}subcategory=${subCategory}`;
                }

                const response = await getProducts({ products: `${queryString}&limit=50` });
                setProducts(response.products)
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [category, subCategory]);
    // console.log(product)
    const handleViewDetails = (id: string) => {
        console.log(`${id} View details for product`)
        // You can add navigation logic here
    }
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
                                onViewDetails={handleViewDetails}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ShopPage;