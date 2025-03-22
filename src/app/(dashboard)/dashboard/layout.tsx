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
                    <main className="p-6">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

