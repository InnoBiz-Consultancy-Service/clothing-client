"use client"
import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import NavItems from "./NavItems/NavItems"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import navLinks from "../../../../public/navLinks.json"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Searching for:", searchQuery)
        // Implement search functionality here
    }

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight">CLOTHING</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <div className="relative" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
                        <button className="flex cursor-pointer items-center gap-1 px-2 py-2 text-sm font-medium">
                            Shop
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={cn("transition-transform", isShopOpen ? "rotate-180" : "")}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isShopOpen && <NavItems isOpen={isShopOpen} />}
                    </div>
                    <Link href="/new-arrivals" className="px-2 py-2 text-sm font-medium">
                        New Arrivals
                    </Link>
                    <Link href="/collections" className="px-2 py-2 text-sm font-medium">
                        Collections
                    </Link>
                    <Link href="/about" className="px-2 py-2 text-sm font-medium">
                        About
                    </Link>
                </nav>

                {/* Search Bar */}
                <div className="hidden md:block flex-1 max-w-md mx-4">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search Products by Titles or Tags"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Search">
                            <Search className="h-4 w-4 text-gray-500" />
                        </button>
                    </form>
                </div>

                {/* Cart */}
                <div className="flex items-center gap-4">
                    <Link href={'/dashboard'}>
                        <Button variant="outline" className="text-gray-700">
                            Dashboard
                        </Button>
                    </Link>

                    {/* Mobile menu button */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="md:hidden cursor-pointer" aria-label="Menu">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="overflow-y-auto h-screen ">
                            <div className="p-4 mt-6">
                                <Accordion type="single" collapsible>
                                    {navLinks.map((category) => (
                                        <AccordionItem value={category.link} key={category.title} className="border-none">
                                            <AccordionTrigger className="cursor-pointer">
                                                <h3 className="text-base font-semibold mb-2 ">{category.title}</h3>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-2 pl-3 border-l-2 border-gray-200">
                                                    {category.items.map((item) => (
                                                        <Link
                                                            href={item.link}
                                                            key={item.name}
                                                            className="block text-base text-gray-700 hover:text-black font-medium transition-all duration-200 relative before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-gray-400 before:rounded-full before:opacity-0 hover:before:opacity-100"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}