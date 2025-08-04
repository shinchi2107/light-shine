import AppSidebar from "@/components/app/app-sidebar";
import ContainerWrapper from "@/components/common/container-wrapper";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { home_header_menus } from "@/constants/menu";
import { MenuIcon } from "lucide-react";

const HeaderHome = () => {
  return (
    <>
    
      <SidebarProvider className="min-h-auto bg-transparent absolute top-0 left-0 right-0 z-50" defaultOpen={false}>
          <AppSidebar className="block md:hidden" position="right" />
          <ContainerWrapper className="px-4 py-3">
            <div className="flex justify-between md:justify-center items-center gap-4">
              <div className="header__logo w-[100px] md:w-[200px]">
                <Image className="w-full h-full object-cover" src="/logo/logo-header-rostay.webp" width={200} height={200} alt="logo-header" />
              </div>
              <NavigationMenu viewport={false} className="hidden md:block">
                <NavigationMenuList className="flex-wrap justify-start">
                  {home_header_menus.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger is_submenu={item.sub_menu.length > 0} className="cursor-pointer uppercase bg-transparent font-[600] text-[13px] text-white hover:text-[var(--color-primary)] data-[state=open]:text-[var(--color-primary)]">{item.title}</NavigationMenuTrigger>
                      {item.sub_menu.length > 0 && (
                        <NavigationMenuContent className="z-50">
                          <ul className="grid w-[200px] gap-4">
                            {item.sub_menu.map((sub_item) => (
                              <li className="cursor-pointer py-2 px-2 hover:bg-gray-100 transition-all duration-300 rounded-md" key={sub_item.title}>
                                <Link href={sub_item.href}>
                                  <div className="text-sm leading-none font-medium">{sub_item.title}</div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      )}
                    </NavigationMenuItem>
                  ))}

                </NavigationMenuList>
              </NavigationMenu>
              <div className="block md:hidden">
                <div className="menu-bar">
                  <SidebarTrigger className="cursor-pointer text-white" icon={<MenuIcon />} />
                </div>
              </div>
            </div>
          </ContainerWrapper>
        </SidebarProvider>
        </>
  )
}

export default HeaderHome;