"use client"
import { FC, ReactNode } from 'react';
import Slider from "@/components/Dashboard/Slider/Slider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import withAdminAuth from '@/components/Secure/WithAdminAuth';

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
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
    );
};

export default withAdminAuth(DashboardLayout);