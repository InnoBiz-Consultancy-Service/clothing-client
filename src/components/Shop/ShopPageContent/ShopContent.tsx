// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import getProducts from '@/apiAction/getProducts';
// import { Loader } from '@/components/Loader/Loader';
// import ProductCard from '@/components/Shop/ProductCard/ProductCard';
// import { ProductCardProps } from '@/types/productProps';

// const ShopContent = () => {
//     const params = useSearchParams();
//     const category = params.get('category');
//     const subCategory = params.get('subcategory');
//     const [products, setProducts] = useState<ProductCardProps[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 setLoading(true);

//                 let queryString = '/products?';
//                 if (category) {
//                     queryString += `category=${category}`;
//                 }
//                 if (subCategory) {
//                     queryString += `${category ? '&' : ''}subcategory=${subCategory}`;
//                 }

//                 const response = await getProducts({ products: `${queryString}&limit=50` });
//                 setProducts(response.products);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [category, subCategory]);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <Loader />
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto mt-4 px-4">
//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.map((product) => {
//                     return (
//                         <ProductCard
//                             key={product._id}
//                             _id={product._id}
//                             name={product.name}
//                             price={product.price}
//                             image={product.images[0]?.src}
//                             category={product?.category || ''}
//                         />
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ShopContent;

'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import getProducts from '@/apiAction/getProducts';
import { Loader } from '@/components/Loader/Loader';
import ProductCard from '@/components/Shop/ProductCard/ProductCard';
import { ProductCardProps } from '@/types/productProps';

const ShopContent = () => {
    const params = useSearchParams();
    const category = params.get('category');
    const subCategory = params.get('subcategory');
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const limit = 10;

    const lastProductRef = useCallback((node: HTMLDivElement | null) => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, loadingMore, hasMore]);

    useEffect(() => {
        setProducts([]);
        setPage(1);
        setHasMore(true);
    }, [category, subCategory]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (page === 1) {
                    setLoading(true);
                } else {
                    setLoadingMore(true);
                }

                let queryString = '/products?';
                if (category) {
                    queryString += `category=${category}`;
                }
                if (subCategory) {
                    queryString += `${category ? '&' : ''}subcategory=${subCategory}`;
                }

                const response = await getProducts({ 
                    products: `${queryString}&limit=${limit}&page=${page}` 
                });
                
                setProducts(prevProducts => [...prevProducts, ...response.products]);
                setHasMore(response.products.length === limit);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
                setLoadingMore(false);
            }
        };

        fetchProducts();
    }, [category, subCategory, page]);

    if (loading && page === 1) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="container mx-auto mt-4 px-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => {
                    if (products.length === index + 1) {
                        return (
                            <div ref={lastProductRef} key={product._id}>
                                <ProductCard
                                    _id={product._id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.images[0]?.src}
                                    category={product?.category || ''}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <ProductCard
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.images[0]?.src}
                                category={product?.category || ''}
                            />
                        );
                    }
                })}
            </div>
            
            {loadingMore && (
                <div className="flex justify-center my-8">
                    <Loader />
                </div>
            )}
            
            {!loading && !loadingMore && products.length === 0 && (
                <div className="text-center py-8">
                    No products found
                </div>
            )}
        </div>
    );
};

export default ShopContent;