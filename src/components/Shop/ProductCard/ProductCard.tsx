// "use client"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

// interface ProductCardProps {
//     id: string
//     title: string
//     price: number
//     imageUrl: string
//     category: string
//     onViewDetails?: (id: string) => void
// }

// export default function ProductCard({
//     id,
//     title,
//     price,
//     imageUrl = "/placeholder.svg?height=400&width=300",
//     category
// }: ProductCardProps) {
//     console.log(category)

//     return (
//         <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//             <div className="relative h-80 overflow-hidden">
//                 <Image
//                     src={imageUrl || "/placeholder.svg"}
//                     alt={title}
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />

//                 {/* Product badges */}
//                 <div className="absolute top-2 left-2 flex  gap-2">
//                     {/* <Badge className="bg-red-600">Sale</Badge> */}
//                     <Badge className="bg-red-600">{category}</Badge>
//                 </div>

//                 {/* Quick actions */}
//                 <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform">
//                     <div className="flex justify-between items-center">
//                         <Link href={`/product-details/${id}`}>
//                             <Button className="cursor-pointer" size="sm" variant="secondary">
//                                 Quick View
//                             </Button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             <div className="p-4">
//                 <Link href={`/product-details/${id}`}>
//                     <h3 className="font-medium mb-1 cursor-pointer hover:underline">{title}</h3>
//                 </Link>
//                 <div className="flex items-center">
//                     {price ? (
//                         <>
//                             <span className="text-red-600 font-bold">${price.toFixed(2)}</span>
//                             <span className="ml-2 text-gray-500 line-through text-sm">${price.toFixed(2)}</span>
//                         </>
//                     ) : (
//                         <span className="font-bold">${price.toFixed(2)}</span>
//                     )}
//                 </div>
//                 <Button className="w-full mt-4 bg-black hover:bg-gray-800">Add to Cart</Button>
//             </div>
//         </div>
//     )
// }

"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
    id: string
    title: string
    price: number
    imageUrl: string
    category: string
    onViewDetails?: (id: string) => void
}

export default function ProductCard({
    id,
    title,
    price,
    imageUrl = "/placeholder.svg?height=400&width=300",
    category
}: ProductCardProps) {
    return (
        <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            {/* Image container with fixed aspect ratio */}
            <div className="relative h-80 overflow-hidden">
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Product badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className="bg-red-600">{category}</Badge>
                </div>

                {/* Quick actions */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white py-3 px-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="flex justify-between items-center">
                        <Link href={`/product-details/${id}`}>
                            <Button className="cursor-pointer" size="sm" variant="secondary">
                                Quick View
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content container with flex-grow to take remaining space */}
            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/product-details/${id}`}>
                    <h3 className="font-medium mb-1 cursor-pointer hover:underline line-clamp-2">{title}</h3>
                </Link>
                <div className="flex items-center mt-auto">
                    {price ? (
                        <>
                            <span className="text-red-600 font-bold">${price.toFixed(2)}</span>
                            <span className="ml-2 text-gray-500 line-through text-sm">${price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="font-bold">${price.toFixed(2)}</span>
                    )}
                </div>
                <Button className="w-full mt-4 bg-black hover:bg-gray-800">Add to Cart</Button>
            </div>
        </div>
    )
}