"use client"

import * as React from "react"
import { AudioWaveform, Bot, Command, GalleryVerticalEnd, Settings2, SquareTerminal } from "lucide-react"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useStore } from "@/hooks/contexts/storeContext"

export function AppSidebar({ ...props }) {
  const { currentUser } = useStore()

  const adminNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal
    },
    {
      title: "Database",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Members",
          url: "/dashboard/members",
        },
        {
          title: "Visitors",
          url: "/dashboard/visitors",
        },
        {
          title: "Attendance",
          url: "/dashboard/attendance",
        },
      ],
    },
    {
      title: "Communication",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Announcements",
          url: "/dashboard/announcements",
        },
        {
          title: "Sms",
          url: "/dashboard/sms",
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "Income",
          url: "/dashboard/income",
        },
        {
          title: "Expenditure",
          url: "/dashboard/expense",
        },
        {
          title: "Accounts",
          url: "/dashboard/accounts",
        },
        {
          title: "Transactions",
          url: "/dashboard/transactions",
        },
      ],
    },
    {
      title: "Assets",
      url: "/dashboard/assets",
      icon: Bot,
      items: [],
    },
    {
      title: "Admin",
      url: "/dashboard/adminpanel",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Events",
          url: "/dashboard/admin/events",
        },
        {
          title: "Groups",
          url: "/dashboard/admin/groups",
        },
        {
          title: "Users/Team",
          url: "/dashboard/admin/users",
        },
      ],
    },
  ]

  const dataEntryNavItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal
    },
    {
      title: "Database",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Members",
          url: "/dashboard/members",
        },
        {
          title: "Visitors",
          url: "/dashboard/visitors",
        },
        {
          title: "Attendance",
          url: "/dashboard/attendance",
        },
      ],
    },
  ]

  const data = {
    user: {
      name: "CanaanLand Faith Sanctuary",
      email: "Cananlandfaithsanctuary@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Canaan Land Faith Sanctuary",
        logo: GalleryVerticalEnd,
        plan: "Maura",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: currentUser?.role === 'admin' ? adminNavItems : dataEntryNavItems,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
