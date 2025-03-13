"use client"
import { navProps } from "@/types/navProps";
import Link from "next/link"
import { useEffect, useState } from "react"

interface NavItemsProps {
    isOpen: boolean
}


export default function NavItems({ isOpen }: NavItemsProps) {
    const [navData, setNavData] = useState<navProps[]>([]);
    useEffect(() => {
        fetch('https://clothing-server-hazel.vercel.app/api/v1/navbar')
            .then(res => res.json())
            .then(data => setNavData(data));
    }, []);
    // console.log(navData)
    if (!isOpen) return null
    return (
        <div className="absolute left-0 top-full z-50 w-screen bg-white shadow-md">
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
                    {navData.map((category) => (
                        <div key={category.title} className="mb-6 md:mb-0">
                            <h3 className="text-sm font-medium mb-3">{category.title}</h3>
                            <div className="space-y-2">
                                {category.items.map((item) => (
                                    <Link
                                        href={item.link}
                                        key={item.name}
                                        className="block text-sm text-gray-600 hover:text-black transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}