'use client'

import { AppSidebar } from "@/components/dashboard/app-sider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React from 'react'
import BreadcrumbNav from "./breadcrumb"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import DataProvider from "./dataFactory"
import { Divider, unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';
import { StoreProvider } from "@/lib/contexts/storeContext"


unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});



const layout = ({ children }) => {
  return (
    <DataProvider>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex shrink-0 shadow-sm items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </div>
            </header>
            <AntdRegistry>{children}</AntdRegistry>
          </SidebarInset>
        </SidebarProvider>
      </StoreProvider>
    </DataProvider>
  )
}

export default layout
