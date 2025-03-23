'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import getProducts from '@/apiAction/getProducts';
import { Loader } from '@/components/Loader/Loader';
import ProductCard from '@/components/Shop/ProductCard/ProductCard';
import { ProductCardProps } from '@/types/productProps';

const ShopContent = () => {
    const params = useSearchParams();
    const category = params.get('category');
    const subCategory = params.get('subCategory');
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                let queryString = '/products?';
                if (category) {
                    queryString += `category=${category}`;
                }
                if (subCategory) {
                    queryString += `${category ? '&' : ''}subcategory=${subCategory}`;
                }

                const response = await getProducts({ products: `${queryString}&limit=50` });
                setProducts(response.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subCategory]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-4 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    const coverImg = Array.isArray(product.images) ? product.images : [];
                    const randomImage =
                        coverImg.length > 0
                            ? coverImg[Math.floor(Math.random() * coverImg.length)].src
                            : 'default.jpg';
                    return (
                        <ProductCard
                            key={product._id}
                            id={product._id}
                            title={product.name}
                            price={product.price}
                            imageUrl={randomImage}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ShopContent;