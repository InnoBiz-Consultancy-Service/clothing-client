"use client"
import getProducts from '@/apiAction/getProducts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
                    <Card
                        key={item._id}
                        className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl bg-white/80 backdrop-blur-md border border-gray-200"
                    >
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
                            <CardHeader className="p-0 relative">
                                <div className="relative h-64 rounded-t overflow-hidden group">
                                    <Image
                                        src={item?.images[0].src || "/fallback.jpg"}
                                        alt={item?.name || "Product Image"}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <Badge className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-medium rounded-full shadow">
                                        {item?.category}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="p-5 bg-white/90 backdrop-blur-lg">
                                <h3 className="text-2xl font-semibold text-gray-800 line-clamp-1 transition-all hover:underline cursor-pointer">
                                    {item?.subCategory}
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
        </>

    )
}

export default NewArrivals
