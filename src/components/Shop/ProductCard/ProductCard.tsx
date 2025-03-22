"use client"
import Image from "next/image"
import { CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ProductCardProps {
    id: string
    title: string
    price: number
    imageUrl: string
    onViewDetails?: (id: string) => void
}

export default function ProductCard({
    id,
    title,
    price,
    imageUrl = "/placeholder.svg?height=400&width=300",
}: ProductCardProps) {


    return (
        <div className="overflow-hidden transition-all duration-300 hover:shadow-lg group w-full max-w-xs">
            <Link href={`/product-details/${id}`}>
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <CardContent className="p-4">
                    <h3 className="font-medium text-lg line-clamp-1 hover:underline">{title}</h3>
                    <p className="font-bold text-xl mt-1 text-primary">৳{price}</p>
                </CardContent>
            </Link>
        </div>
    )
}