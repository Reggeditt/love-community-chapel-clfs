"use client"

import * as React from "react"
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, Map, PieChart, Settings2, SquareTerminal } from "lucide-react"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

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
  navMain: [
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
        // {
        //   title: "Children",
        //   url: "/dashboard/children",
        // },
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
          url: "dashboard/users",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }) {
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
