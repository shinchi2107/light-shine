"use client"
import { useSidebar } from "../../ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { DropdownMenu, DropdownMenuGroup, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar"
import { IconCreditCard, IconDotsVertical, IconLogout, IconNotification, IconUserCircle } from "@tabler/icons-react"
import { useAccountProfile } from "@/src/hooks/queries/useAccount"

const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://github.com/evilrabbit.png",
}

const NavUser = () => {
    const { isMobile } = useSidebar()
    const { data: account } = useAccountProfile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={account?.payload?.data?.avatar} alt={account?.payload?.data?.name} />
                                <AvatarFallback className="rounded-lg">{account?.payload?.data?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{account?.payload?.data?.name}</span>
                                <span className="text-muted-foreground truncate text-xs">
                                    {account?.payload?.data?.email}
                                </span>
                            </div>
                            <IconDotsVertical className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={account?.payload?.data?.avatar} alt={account?.payload?.data?.name} />
                                    <AvatarFallback className="rounded-lg">{account?.payload?.data?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{account?.payload?.data?.name}</span>
                                    <span className="text-muted-foreground truncate text-xs">
                                        {account?.payload?.data?.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <IconUserCircle />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconCreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <IconNotification />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <IconLogout />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default NavUser;