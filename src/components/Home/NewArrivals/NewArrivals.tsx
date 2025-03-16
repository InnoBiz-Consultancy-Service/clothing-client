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
                console.log(response)
                setNewProducts(response.products)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [])
    // console.log(newProducts)
    return (
        <>
            {
                newProducts?.map((item: ProductProps) => {
                    return (
                        <Card key={item._id} className="overflow-hidden w-full max-w-sm transition-all duration-300 hover:shadow-xl border-0 shadow-md rounded">
                            <Link
                                href="/[category]/[subCategory]"
                                as={`/${item.category}/${item.subCategory}`}
                                key={item.name}>


                                <CardHeader className="p-0">
                                    <div className="relative h-64 rounded-t w-full overflow-hidden group">
                                        <Image
                                            src={item?.image?.img1 || "/fallback.jpg"}
                                            alt={item?.name || "Product Image"}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium">
                                            {item?.category}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6 bg-gradient-to-b from-white to-slate-50">
                                    <div className="flex justify-between items-start mb-3">



                                        <h3 className="font-semibold cursor-pointer hover:underline text-lg line-clamp-1 text-gray-800">{item?.name}</h3>
                                    </div>

                                </CardContent>
                            </Link>
                        </Card>
                    )
                })
            }
        </>
    )
}

export default NewArrivals
