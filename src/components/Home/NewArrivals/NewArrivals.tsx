"use client"
import getProducts from '@/apiAction/getProducts'
import { ProductProps } from '@/types/productProps'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEffect } from 'react'

const NewArrivals: React.FC<ProductProps> = () => {
    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts({ products: '/products' });
                // console.log(response)
                setNewProducts(response.products)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [])
    return (
        <>



            {newProducts?.map((item: ProductProps) => {
                return (
                    <div key={item._id} className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-md border border-gray-200">
                        <Link
                            href={{
                                pathname: "/shop",
                                query: {
                                    category: item?.category,
                                    subcategory: item?.subCategory,
                                },
                            }}
                            className="block"
                        >
                            <div className="relative">
                                <h3 className="absolute text-white -top-2 md:-top-4 lg:-top-2 left-1/2 z-40 transform -translate-x-1/2 bg-[#E7000B] text-lg px-2 py-1 rounded-lg shadow-md font-bold">
                                    {item?.subCategory}
                                </h3>
                                <div className="relative w-full h-56">
                                    <Image
                                        src={item?.images?.[0]?.src || "/fallback.jpg"}
                                        alt={item?.name || "Product Image"}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </>

    )
}

export default NewArrivals
