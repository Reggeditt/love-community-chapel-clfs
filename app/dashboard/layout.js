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

const layout = ({ children }) => {
  return (
    <DataProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbNav />
            </div>
          </header>
          <AntdRegistry>{children}</AntdRegistry>
        </SidebarInset>
      </SidebarProvider>
    </DataProvider>
  )
}

export default layout
