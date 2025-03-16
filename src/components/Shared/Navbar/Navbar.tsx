"use client"
import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import NavItems from "./NavItems/NavItems"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { navProps } from "@/types/navProps"
import getNavbarData from "@/apiAction/getNavbarData"
import logo from '../../../../public/clothing.png'
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [navItems, setNavItems] = useState<navProps[]>([]);
    const session = useSession();


    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Searching for:", searchQuery)
        // Implement search functionality here
        // TO DO
    }
    useEffect(() => {
        const navbarData = async () => {
            const data = await getNavbarData();
            setNavItems(data);
        };
        navbarData();
    }, []);

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} width={30} height={30} alt="Ten Rush" />
                    <p className='space-x-1 text-lg'> <span className="bg-red-600 px-2 rounded text-white">Ten</span><span>Rus</span></p>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <div className="relative" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
                        <Link className="hover:text-red-600" href={'/shop'}>
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
                        </Link>

                        {/* Dropdown Menu */}
                        {isShopOpen && <NavItems isOpen={isShopOpen} />}
                    </div>
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

                    <Link href={'/OrderBulk'}>
                        <Button variant="outline" className="text-gray-700 cursor-pointer">
                            <ShoppingCart /> Order Bulk
                        </Button>
                    </Link>


                    {session.status === "authenticated" ? (
                        <>
                            <Link href={'/dashboard'}>
                                <Button variant="outline" className="text-gray-700 cursor-pointer">
                                    Dashboard
                                </Button>
                                <Button variant="outline" className="text-gray-700 cursor-pointer" onClick={() => signOut()}>
                                    Logout
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Link href={'/login'}>
                            <Button variant="outline" className="text-gray-700 cursor-pointer">
                                Login
                            </Button>
                        </Link>

                    )}


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
                                    {navItems.map((category) => (
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