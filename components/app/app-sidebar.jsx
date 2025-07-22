import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import menus from "@/constants/menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
const AppSidebar = ({ className, position }) => {
    return (
        <Sidebar className={className} side={position}>
            <SidebarContent>
            {menus.map((item) => (
                <Collapsible className="group/collapsible" key={item.title}>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarGroupLabel asChild className="cursor-pointer hover:bg-gray-200 data-[state=open]:bg-gray-200">
                                    <CollapsibleTrigger>
                                        <span>{item.title}</span>
                                        {item.sub_menu.length > 0 && (
                                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                        )}
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>
                                {item.sub_menu.length > 0 && (
                                    <CollapsibleContent>
                                        <SidebarMenu className="cursor-pointer hover:bg-gray-150">
                                            {item.sub_menu.map((sub_item) => (
                                                <SidebarMenuItem key={sub_item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <a href={sub_item.url}>
                                                            <span className="text-[12px]">{sub_item.title}</span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </CollapsibleContent>
                                )}
                            </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                </Collapsible>
            ))}
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;