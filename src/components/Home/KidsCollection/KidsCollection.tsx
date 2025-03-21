"use client"
import getProducts from '@/apiAction/getProducts'
import { ProductProps } from '@/types/productProps'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const KidsCollection = () => {
    const [kidsProduct, setKidsProduct] = useState<ProductProps[]>([])
    useEffect(() => {
        const fetchKidsProduct = async () => {
            try {
                const response = await getProducts({ products: `/products?category=kids&limit=8` })
                setKidsProduct(response.products)
            } catch (err) {
                console.log(err)
            }
        }
        fetchKidsProduct()
    }, [])

    return (
        <div>
            <section className="py-8 bg-white">
                <div className="container mx-auto px-4">
                    <header className="mb-6 text-center">
                        <h2 className="text-3xl font-semibold tracking-wider text-gray-800 uppercase">
                            Kids Collection
                        </h2>
                        <div className="w-20 h-[2px] bg-gray-400 mx-auto mt-1 mb-2"></div>
                    </header>

                    <div className="mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-3">
                                <div className="relative h-64 md:h-[495px] rounded overflow-hidden shadow-md group">
                                    <Image
                                        src={'https://i.pinimg.com/736x/7e/30/20/7e30207e993ab195fb0ee144d5c66f1e.jpg'}
                                        alt={`featuredWomen.name`}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white text-xl font-light tracking-wider uppercase mb-1">
                                            Kids
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
                                    {kidsProduct.map((product) => {
                                        const coverImg = Array.isArray(product.images) ? product.images : [];
                                        const randomImage = coverImg.length > 0 ? coverImg[Math.floor(Math.random() * coverImg.length)].src : "default.jpg";
                                        return (
                                            <div key={product._id} className="group">
                                                <div className="bg-gray-50 rounded overflow-hidden shadow-sm relative h-44 md:h-60">
                                                    <Image
                                                        src={randomImage}
                                                        alt={product.name}
                                                        width={200}
                                                        height={200}
                                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-100 transition-all duration-300 flex items-center justify-center opacity-60 md:opacity-0 group-hover:bg-opacity-10 group-hover:opacity-60">
                                                        <button>
                                                            <Link
                                                                href={"/Details"}
                                                                className="bg-white text-gray-900 py-1 px-3 rounded-sm text-xs font-medium transform transition-all duration-300"
                                                            >
                                                                View
                                                            </Link>
                                                        </button>
                                                    </div>
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                                                        <h4 className="text-white text-sm font-medium truncate">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-white/70 text-xs">
                                                            ${product.price}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
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

export default KidsCollection
