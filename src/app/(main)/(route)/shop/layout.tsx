import ShopLayout from '@/components/Shop/ShopLayout/ShopLayout';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex px-4 h-screen overflow-hidden">
            <SidebarProvider>
                <div className="h-screen">
                    <ShopLayout />
                </div>
                <SidebarInset className="flex-1 overflow-auto">
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default layout
