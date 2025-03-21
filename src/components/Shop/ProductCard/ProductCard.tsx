"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
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
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
                <p className="font-bold text-xl mt-1 text-primary">${price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/Details/${id}`}>
                    <Button className="w-full group" variant="outline">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </div>
    )
}