"use client"
import { useEffect, useState } from "react"
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
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const [isShopOpen, setIsShopOpen] = useState(false);
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname();
    const [navItems, setNavItems] = useState<navProps[]>([]);
    const [, setLoading] = useState(true);
    const session = useSession();

    useEffect(() => {
        const navbarData = async () => {
            try {
                const data = await getNavbarData();
                setNavItems(data);
            } catch (error) {
                console.error('Error fetching navbar data:', error);
            } finally {
                setLoading(false);
            }
        };

        navbarData();
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);


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
                    <Link href={"/OrderBulk"}>
                        <Button variant="outline" className="text-gray-700 cursor-pointer">
                            <ShoppingCart /> Order Bulk
                        </Button>
                    </Link>

                    {session.status === "authenticated" && (
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
                                    {navItems.map((category) => (
                                        <AccordionItem value={category.link} key={category.title} className="border-none">
                                            <AccordionTrigger className="cursor-pointer">
                                                <h3 className="text-base font-semibold mb-2 ">{category.title}</h3>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-2 pl-3 border-l-2 border-gray-200">
                                                    {category.items.map((item) => (
                                                        // <Link
                                                        //     href="/shop/[category]/[subCategory]"
                                                        //     as={`/shop/${category.title}/${item.name}`}
                                                        //     key={item.name}
                                                        //     className="block text-sm text-gray-600 hover:text-black transition-colors"
                                                        // >
                                                        //     {item.name}
                                                        // </Link>

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
        </header>
    )
}

