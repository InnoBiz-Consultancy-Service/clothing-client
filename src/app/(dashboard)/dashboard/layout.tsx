import Slider from "@/components/Dashboard/Slider/Slider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex">
                <SidebarProvider>
                    <Slider />
                    <main>
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
