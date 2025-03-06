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
import { StoreProvider } from "@/lib/contexts/storeContext"
import { auth } from "@/lib/firebase"
import { redirect } from "next/navigation"
import { useAuth } from "@/lib/contexts/authContext"
import { Avatar } from "antd"


const layout = ({ children }) => {
  const {user} = useAuth();
  useEffect(()=>{
    if(!auth.currentUser) redirect('/login')
  }, [auth.currentUser])
  return (
    <DataProvider>
      <StoreProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex shrink-0 shadow-sm py-4 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BreadcrumbNav />
              </div>
              <Avatar 
                src={
                  user?.photoURL || user?.displayName?.split(' ').map((name)=>name[0]).join('') || user?.email[0] || 'User'
                }
                className="mr-4"
              />
            </header>
            <AntdRegistry>{children}</AntdRegistry>
          </SidebarInset>
        </SidebarProvider>
      </StoreProvider>
    </DataProvider>
  )
}

export default layout
