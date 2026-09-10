"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboardIcon,
  UsersIcon,
  UserCheckIcon,
  HandshakeIcon,
  BuildingIcon,
  WarehouseIcon,
  NewspaperIcon,
  BarChart3Icon,
  SettingsIcon,
  ScrollTextIcon,
  LogOutIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboardIcon },
  { label: "Users", href: "/admin/users", icon: UsersIcon },
  { label: "Delegates", href: "/admin/delegates", icon: UserCheckIcon },
  { label: "Sponsors", href: "/admin/sponsors", icon: HandshakeIcon },
  { label: "Exhibitors", href: "/admin/exhibitors", icon: BuildingIcon },
  { label: "Booths", href: "/admin/booths", icon: WarehouseIcon },
  { label: "News", href: "/admin/news", icon: NewspaperIcon },
  { label: "Reports", href: "/admin/reports", icon: BarChart3Icon },
  { label: "Settings", href: "/admin/settings", icon: SettingsIcon },
  { label: "System Logs", href: "/admin/logs", icon: ScrollTextIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-heading text-lg font-bold text-primary group-data-[collapsible=icon]:hidden">
            MIICCOF Admin
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<button type="button" />}
              tooltip="Sign Out"
              onClick={async () => {
                await authClient.signOut();
                router.push("/");
              }}
            >
              <LogOutIcon />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
