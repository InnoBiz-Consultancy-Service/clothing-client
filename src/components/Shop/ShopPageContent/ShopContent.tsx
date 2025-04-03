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
//                     const coverImg = Array.isArray(product.images) ? product.images : [];
//                     const randomImage =
//                         coverImg.length > 0
//                             ? coverImg[Math.floor(Math.random() * coverImg.length)].src
//                             : 'default.jpg';
//                     return (
//                         <ProductCard
//                             key={product._id}
//                             id={product._id}
//                             title={product.name}
//                             price={product.price}
//                             imageUrl={randomImage}
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
import { useEffect, useState } from 'react';
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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const productsPerPage = 5;

    console.log(products)

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

                const response = await getProducts({
                    products: `${queryString}&limit=${productsPerPage}&page=${currentPage}`
                });
                setProducts(response.products);
                setTotalPages(Math.ceil(response.totalCount / productsPerPage));
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, subCategory, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

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
                })}
            </div>

            {/* Pagination */}

            <div className="flex justify-center mt-8 mb-8">
                <nav className="flex items-center gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border disabled:opacity-50"
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded border ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border disabled:opacity-50"
                    >
                        Next
                    </button>
                </nav>
            </div>

        </div>
    );
};

export default ShopContent;