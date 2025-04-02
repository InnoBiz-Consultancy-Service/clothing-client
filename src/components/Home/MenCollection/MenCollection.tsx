"use client"
import getProducts from '@/apiAction/getProducts'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductProps } from '@/types/productProps'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MenCollection = () => {
    const [mensProduct, setMensProduct] = useState<ProductProps[]>([])
    useEffect(() => {
        const fetchMenProduct = async () => {
            try {
                const response = await getProducts({ products: `/products?category=mens&limit=8` })
                setMensProduct(response.products)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMenProduct()
    }, [])

    return (
        <div>
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <header className="mb-6 text-center">
                        <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
                            Mens Collection
                        </h2>
                        <div className="w-20 h-[2px] bg-gray-400 mx-auto mt-1 mb-2"></div>
                    </header>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                                <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                                    <Image
                                        src={'https://i.pinimg.com/474x/89/d9/20/89d9202ca81e5cf7e80a37555b62b128.jpg'}
                                        alt={`featuredWomen.name`}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                                            Mens
                                            <span className="block font-semibold">Collection</span>
                                        </h3>
                                        <div className="h-px w-12 bg-white mb-3"></div>
                                        <button className="bg-white bg-opacity-20 text-white text-xs uppercase tracking-wider py-1 px-3 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-gray-900 transition-all duration-300">
                                            Explore
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* Products in Grid */}
                            <div className="md:col-span-9">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {mensProduct.map((product) => {
                                        return (
                                            <Card
                                                key={product._id}
                                                className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg h-[250px] transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-md border border-gray-200"
                                            >
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
                                                    <CardHeader className="p-0 relative">
                                                        <div className="relative h-[150px] rounded-t overflow-hidden group">
                                                            <Image
                                                                src={product?.images[0].src || "/fallback.jpg"}
                                                                alt={product?.name || "Product Image"}
                                                                fill
                                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                                sizes="(max-width: 768px) 100vw, 300px"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </CardHeader>

                                                    <CardContent className="p-5 bg-white/90 backdrop-blur-lg">
                                                        <h3 className="text-2xl font-semibold text-gray-800 line-clamp-1 transition-all hover:underline cursor-pointer">
                                                            {product?.subCategory}
                                                        </h3>
                                                    </CardContent>

                                                    <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full shadow-md hover:bg-gray-900 transition-all">
                                                            View More
                                                        </button>
                                                    </div>
                                                </Link>
                                            </Card>
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

export default MenCollection
