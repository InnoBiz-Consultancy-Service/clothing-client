"use client"
import getProducts from '@/apiAction/getProducts'
import { ProductProps } from '@/types/productProps'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const WomenCollection = () => {
    const [womenProduct, setWomenProduct] = useState<ProductProps[]>([])
    useEffect(() => {
        const fetchWomenProduct = async () => {
            try {
                const response = await getProducts({ products: `/products?category=women&limit=8` })
                setWomenProduct(response.products)
            } catch (err) {
                console.log(err)
            }
        }
        fetchWomenProduct()
    }, [])

    return (
        <div>
            <section className="py-8 mt-10 bg-white">
                <div className="container mx-auto px-4">
                    <header className="mb-6 text-center">
                        <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
                            Women Collection
                        </h2>
                        <div className="w-20 h-[4px] rounded-2xl bg-red-500 mx-auto mt-1 mb-2"></div>
                    </header>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                                <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                                    <Image
                                        src={'https://images.unsplash.com/photo-1700748910236-3b744b8dacad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        alt={`featuredWomen.name`}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                                            Women
                                            <span className="block font-semibold">Collection</span>
                                        </h3>
                                        <div className="h-px w-12 bg-white mb-3"></div>
                                        <button className="bg-white bg-opacity-20 text-black text-xs uppercase tracking-wider py-1 px-3 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300 cursor-pointer">
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Products in Grid */}
                            <div className="md:col-span-9">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                    {womenProduct.map((product) => {
                                        return (
                                            <div key={product._id} className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-md border border-gray-200">
                                                <Link
                                                    href={{
                                                        pathname: "/shop",
                                                        query: {
                                                            category: product?.category,
                                                            subcategory: product?.subCategory,
                                                        },
                                                    }}
                                                    className="block"
                                                >
                                                    <div className="relative">
                                                        <h3 className="absolute text-white -top-2 md:-top-4 lg:-top-2 left-1/2 z-40 transform -translate-x-1/2 bg-[#E7000B] text-lg px-2 py-1 rounded-lg shadow-md font-bold">
                                                            {product?.subCategory}
                                                        </h3>
                                                        <div className="relative w-full h-56">
                                                            <Image
                                                                src={product?.images?.[0]?.src || "/fallback.jpg"}
                                                                alt={product?.name || "Product Image"}
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
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default WomenCollection
