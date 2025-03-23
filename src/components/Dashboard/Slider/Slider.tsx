"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
    Home,
    ChevronsLeft,
    ChevronsRight,
    FilePlus2,
    SquareGanttChartIcon as SquareChartGantt,
    ShoppingCart,
    Menu,
    X,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import logo from '../../../../public/clothing.png'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"

const menuItems = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { title: "Add Product", icon: <FilePlus2 size={20} />, path: "/dashboard/add-product" },
    { title: "BulkOrder", icon: <ShoppingCart size={20} />, path: "/dashboard/bulkOrder" },
    { title: "All Product", icon: <SquareChartGantt size={20} />, path: "/dashboard/all-product" },
]

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isMobile = useIsMobile()

    // Close mobile menu when navigating
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const SidebarContent = () => (
        <div className="flex flex-col justify-between h-full">
            <div>
                <Link href={"/"}>
                    <button className="flex items-center space-x-1 cursor-pointer">
                        <Image src={logo} width={40} height={40} alt="logo" />
                        <p className={`${isCollapsed && !isMobile ? "hidden" : "flex"} space-x-1`}>
                            <span className="bg-red-600 px-2 rounded text-white">Ten</span>
                            <span>Rus</span>
                        </p>
                    </button>
                </Link>

                <ul className="space-y-2 mt-8">
                    {menuItems.map((item, index) => {
                        // Check if current route is active
                        const isActive = pathname === item.path

                        return (
                            <li key={index} className="relative group my-4">
                                <Link
                                    href={item.path}
                                    className={`flex items-center space-x-2 p-2 rounded transition-all duration-300 ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"}`}
                                >
                                    {item.icon}
                                    {(!isCollapsed || isMobile) && <span>{item.title}</span>}
                                </Link>
                                {isCollapsed && !isMobile && (
                                    <span className="absolute left-12 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.title}
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
            </Avatar>
        </div>
    )

    // Desktop sidebar
    if (!isMobile) {
        return (
            <div
                className={`relative flex flex-col justify-between bg-gray-300 h-screen p-4 transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"}`}
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute cursor-pointer -right-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-40 shadow-md hover:bg-gray-600"
                >
                    {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
                </button>

                <SidebarContent />
            </div>
        )
    }

    // Mobile sidebar with hamburger menu
    return (
        <>
            {/* Hamburger menu button for mobile */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="fixed top-4 z-50 md:hidden">
                        <Menu size={24} />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[80%] max-w-[300px] bg-gray-300">
                    <div className="h-full p-4">
                        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => setIsOpen(false)}>
                            <X size={24} />
                            <span className="sr-only">Close menu</span>
                        </Button>
                        <SidebarContent />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default Sidebar

