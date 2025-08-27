"use client";
import AppSidebarHome from "@/src/components/app/app-sidebar-home";
import ContainerWrapper from "@/src/components/common/container-wrapper";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/src/components/ui/navigation-menu";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { home_header_menus } from "@/src/constants/menu";
import { HeartIcon, LogOutIcon, UserIcon } from "lucide-react";
import HeaderMenuBarIcon from "@/src/components/icon/HeaderMenuBarIcon";
import CartDrawerIcon from "@/src/components/icon/CartDrawerIcon";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/src/components/ui/menubar";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/src/hooks/queries/useAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/src/store/auth.store";
const menu_bar_items_common = [
  {
    title: "Wishlist",
    href: "/wishlist",
    authRequired: false,
    icon: HeartIcon,
  }
]

const menu_bar_items_auth = [
  {
    title: "Login",
    href: "/login",
    authRequired: false,
    icon: UserIcon,
  },
  {
    title: "Register",
    href: "/register",
    authRequired: false,
    icon: UserIcon,
  },
  {
    title: "Profile",
    href: "/manage/profile",
    authRequired: true,
    icon: UserIcon,
  },
]
const HeaderHome = () => {
  const router = useRouter();
  const { mutateAsync: logoutMutation, isPending } = useLogoutMutation();
  const { clearAuth, accessToken } = useAuthStore();
  const isAuth = !!accessToken;

  const handleLogout = async () => {
    if (isPending) return;
    try {
      const { payload } = await logoutMutation({});
      if (payload.meta.code === 200) {
        toast.success("Logout successfully");
        clearAuth()
      }
      router.push("/login")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <ContainerWrapper className="px-4 py-3 2xl:max-w-full 2xl:px-8">
        <div className="menu-wrapper flex justify-between items-center">
          <div className="flex flex-1 md:flex-none justify-between md:justify-center items-center gap-4">
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
            <SidebarProvider className="min-h-auto bg-transparent z-50" defaultOpen={false}>
              <AppSidebarHome className="block md:hidden" position="right" />
              <div className="menu-bar block md:hidden">
                <SidebarTrigger className="cursor-pointer text-white" icon={<HeaderMenuBarIcon />} />
              </div>
            </SidebarProvider>
          </div>
          <div className="menu-bar__right items-center gap-4 md:flex hidden">
            <div className="menu-bar__right__user flex items-center text-white">
              <Menubar className="bg-[#0e1618] border-none">
                <MenubarMenu>
                  <MenubarTrigger className="text-white shadow-none cursor-pointer bg-transparent data-[state=closed]:text-white data-[state=open]:text-white data-[state=open]:bg-[#0e1618] focus:bg-[#0e1618]">
                    <UserIcon />
                  </MenubarTrigger>
                  <MenubarContent>
                    {menu_bar_items_auth.map((item) => {
                      const Icon = item.icon;
                      if ((item.authRequired && !isAuth) || (!item.authRequired && isAuth)) return null;
                      return (
                        <MenubarItem key={item.title}>
                          <Link href={item.href} className="cursor-pointer flex items-center gap-2 hover:text-[var(--color-primary)] transition-all duration-300">
                            <Icon className="hover:text-[var(--color-primary)]" />
                            {item.title}
                          </Link>
                        </MenubarItem>
                      )
                    })}
                    {menu_bar_items_common.map((item) => {
                      const Icon = item.icon;
                      return (
                        <MenubarItem key={item.title}>
                          <Link href={item.href} className="cursor-pointer flex items-center gap-2 hover:text-[var(--color-primary)] transition-all duration-300">
                            <Icon className="hover:text-[var(--color-primary)]" />
                            {item.title}
                          </Link>
                        </MenubarItem>
                      )
                    })}
                    {isAuth && (
                      <MenubarItem>
                        <button onClick={() => handleLogout("logout")} className="cursor-pointer flex items-center gap-2 hover:text-[var(--color-primary)] transition-all duration-300">
                          <LogOutIcon />
                          Logout
                        </button>
                      </MenubarItem>
                    )}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="menu-bar__right__cart cursor-pointer text-white">
              <CartDrawerIcon />
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </>
  )
}

export default HeaderHome;