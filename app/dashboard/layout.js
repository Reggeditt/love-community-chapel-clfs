'use client'

import { AppSidebar } from "@/components/dashboard/app-sider"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import React, { useEffect } from 'react'
import BreadcrumbNav from "./breadcrumb"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import DataProvider from "./dataFactory"
import { StoreProvider } from "@/hooks/contexts/storeContext"
import { auth } from "@/lib/firebase"
import { redirect } from "next/navigation"
import { useAuth } from "@/hooks/contexts/authContext"
import { Avatar } from "antd"
import ProfileAvatar from "@/components/header"
import { Appconfig } from "@/app.config"


const layout = ({ children }) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!auth.currentUser) redirect(Appconfig.routes.index)
  }, [auth.currentUser])

  return (
    <DataProvider>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex shrink-0 shadow-sm p-4 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </div>
              <ProfileAvatar />
            </header>
            <AntdRegistry>{children}</AntdRegistry>
          </SidebarInset>
        </SidebarProvider>
      </StoreProvider>
    </DataProvider>
  )
}

export default layout
