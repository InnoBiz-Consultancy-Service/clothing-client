"use client"
import getProducts from '@/apiAction/getProducts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ProductProps } from '@/types/productProps'
import Image from 'next/image'
import { useState } from 'react'

import { useEffect } from 'react'

const NewArrivals: React.FC<ProductProps> = () => {
    const [newProducts, setNewProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                console.log(response)
                setNewProducts(response.products)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts();
    }, [])

    return (
        <>
            {
                newProducts.map((item: ProductProps) => (
                    <Card key={item._id} className="overflow-hidden w-full max-w-sm transition-all duration-300 hover:shadow-xl border-0 shadow-md rounded">
                        <CardHeader className="p-0">
                            <div className="relative h-64 rounded-t w-full overflow-hidden group">
                                <Image
                                    src={item?.image || "/placeholder.svg"}
                                    alt={item?.name}
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
                                {/* <span className="font-bold text-lg text-indigo-600">{item?.price}</span> */}
                            </div>
                            {/* <Badge variant="outline" className="mb-3 border-indigo-200 text-red-600">
                                {item?.subCategory}
                            </Badge>
                            <p className="text-gray-600 text-sm line-clamp-2">{item?.description}</p> */}
                        </CardContent>
                    </Card>
                ))
            }
        </>
    )
}

export default NewArrivals
