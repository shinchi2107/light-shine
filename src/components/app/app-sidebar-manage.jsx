import Link from "next/link";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { manage_menus } from "@/src/constants/menu";
import NavUser from "./nav/nav-user";

const AppSidebarManage = ({ className, position }) => {
    return (
        <Sidebar collapsible="offcanvas" className={className} side={position}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href="/">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {manage_menus.navMain.map((menu) => {
                                const Icon = menu.icon;
                                return (
                                    <SidebarMenuItem key={menu.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={menu.href} className="flex items-center gap-2 font-[500]">
                                                <Icon />
                                                {menu.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {manage_menus.navSecondary.map((menu) => {
                                const Icon = menu.icon;
                                return (
                                    <SidebarMenuItem key={menu.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={menu.url} className="flex items-center gap-2 font-[500]">
                                                <Icon />
                                                {menu.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebarManage;