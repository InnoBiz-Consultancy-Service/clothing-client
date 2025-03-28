"use client"
import { SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart } from "lucide-react"
import { cn } from "@/lib/utils"
import NavItems from "./NavItems/NavItems"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import type { navProps } from "@/types/navProps"
import getNavbarData from "@/apiAction/getNavbarData"
import logo from "../../../../public/clothing.png"
import Image from "next/image"
import { motion } from "framer-motion"

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
}
import { usePathname } from "next/navigation"
import getProducts from "@/apiAction/getProducts"
import { Loader } from "@/components/Loader/Loader"
import { ProductCardProps } from "@/types/productProps"
import useAdmin from "@/hooks/useAdmin"

export default function Navbar() {
    const [isShopOpen, setIsShopOpen] = useState(false)
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname()
    const [navItems, setNavItems] = useState<navProps[]>([])
    const [, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchProduct, setSearchProduct] = useState<ProductCardProps[]>([])
    // const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false)
    // const [admin, setAdmin] = useState<boolean>();

    useEffect(() => {
        const navbarData = async () => {
            try {
                const data = await getNavbarData()
                setNavItems(data)
            } catch (error) {
                console.error("Error fetching navbar data:", error)
            } finally {
                setLoading(false)
            }
        }

        navbarData()
    }, [])
    useEffect(() => {
        setOpen(false)
    }, [pathname])
    const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        const fetchSearchProducts = async () => {
            try {
                if (searchQuery.trim() === "") {
                    setSearchProduct([])
                    return
                }

                setIsLoading(true)
                const response = await getProducts({ products: `/search-products?product=${searchQuery}` })
                setSearchProduct(response.data || [])
            } catch (error) {
                console.error("Error fetching search products:", error)
                setSearchProduct([])
            } finally {
                setIsLoading(false)
            }
        }

        const debounceTimer = setTimeout(() => {
            fetchSearchProducts()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [searchQuery])
    // call useAdmin and check
    const admin = useAdmin()
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className=" flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo || "/placeholder.svg"} width={30} height={30} alt="Ten Rush" />
                    <p className="space-x-1 text-lg">
                        {" "}
                        <span className="bg-red-600 px-2 rounded text-white">Ten</span>
                        <span>Rus</span>
                    </p>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    <div className="relative" onMouseEnter={() => setIsShopOpen(true)} onMouseLeave={() => setIsShopOpen(false)}>
                        <Link className="hover:text-red-600" href={"/shop"}>
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
                    <div className="relative">
                        <input
                            value={searchQuery}
                            onChange={handleSearch}
                            type="text"
                            placeholder="Search Products by Titles or Tags"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2" aria-label="Search">
                            <Search className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Cart */}
                <div className="flex items-center gap-4">

                    {!admin && (
                        <Link href={"/cartPage"}>
                            <Button variant="outline" className="text-gray-700 cursor-pointer">
                                <ShoppingCart />
                            </Button>
                        </Link>
                    )}

                    <Link href={"/OrderBulk"}>
                        <Button variant="outline" className="text-gray-700 cursor-pointer">
                            <ShoppingCart /> Order Bulk
                        </Button>
                    </Link>

                    {admin === true && (
                        <>
                            <Link href={"/dashboard"}>
                                <Button variant="outline" className="text-gray-700 cursor-pointer">
                                    Dashboard
                                </Button>
                            </Link>
                        </>
                    )}

                    {/* Mobile menu button */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button className="md:hidden cursor-pointer" aria-label="Menu">
                                <Menu className="h-6 w-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="left" className="overflow-y-auto h-screen ">
                            <div className="p-4 mt-6">
                                <Accordion type="single" collapsible>
                                    {navItems?.map((category) => (
                                        <AccordionItem value={category.link} key={category.title} className="border-none">
                                            <AccordionTrigger className="cursor-pointer">
                                                <h3 className="text-base font-semibold mb-2 ">{category.title}</h3>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-2 pl-3 border-l-2 border-gray-200">
                                                    {category.items.map((item) => (
                                                        <Link
                                                            href={{
                                                                pathname: "/shop",
                                                                query: {
                                                                    category: category.title,
                                                                    subcategory: item.name,
                                                                },
                                                            }}
                                                            key={item.name}
                                                            className="block text-sm text-gray-600 hover:text-black transition-colors"
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
            <div className="flex justify-center">
                <div className="relative w-1/2 mx-auto">
                    {/* Search input */}
                    {searchQuery.trim() !== "" && (
                        <motion.div
                            className="absolute z-50 w-full bg-white rounded-lg shadow-lg border border-border overflow-hidden"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-2">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                                    {isLoading ? "Searching..." : `${searchProduct.length} results found`}
                                </h3>
                            </div>

                            <motion.div
                                className="max-h-[400px] overflow-y-auto"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center p-8">
                                        <Loader />
                                    </div>
                                ) : searchProduct.length > 0 ? (
                                    searchProduct.map((item) => (
                                        <motion.div key={item._id} className="group" variants={container}>
                                            <a href={`/product-details/${item._id}`} className="block">
                                                <div className="flex items-center p-3 hover:bg-gray-50 transition-colors duration-150">
                                                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <Image
                                                            src={item?.images?.[0]?.src || "/placeholder.svg"}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-150">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm font-bold text-primary">{item.price}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-muted-foreground">No products found</div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    )
}

