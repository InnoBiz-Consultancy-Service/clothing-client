import SearchBar from "@/components/Dashboard/SearchBar/SearchBar";
import Slider from "@/components/Dashboard/Slider/Slider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SidebarProvider>
                <div className="h-screen">
                    <Slider />
                </div>
                <SidebarInset className="flex-1 overflow-auto">
                    <header className="flex h-16 items-center gap-4 border-b px-6 sticky top-0 bg-background z-10">
                        <SearchBar />
                    </header>
                    <main className="p-6">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

