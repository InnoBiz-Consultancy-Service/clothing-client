"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, ChevronsLeft, ChevronsRight, FilePlus2, SquareChartGantt } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
    { title: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { title: "Add Product", icon: <FilePlus2 size={20} />, path: "/dashboard/add-product" },
    { title: "All Product", icon: <SquareChartGantt size={20} />, path: "/dashboard/all-product" },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <div
            className={`relative flex flex-col justify-between bg-gray-300 h-screen p-4 transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"
                }`}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute cursor-pointer -right-5 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
            >
                {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
            </button>

            <ul className="space-y-2 mt-8">
                {menuItems.map((item, index) => {
                    // Check if current route is active
                    const isActive = pathname === item.path;

                    return (
                        <li key={index} className="relative group my-4">
                            <Link
                                href={item.path}
                                className={`flex items-center space-x-2 p-2 rounded transition-all duration-300 ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-white"
                                    }`}
                            >
                                {item.icon}
                                {!isCollapsed && <span>{item.title}</span>}
                            </Link>
                            {isCollapsed && (
                                <span className="absolute left-12 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.title}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
        </div>
    );
};

export default Sidebar;
