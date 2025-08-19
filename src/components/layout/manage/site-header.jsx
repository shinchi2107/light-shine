"use client"
import { usePathname } from "next/navigation";
const { Button } = require("../../ui/button")
const { Separator } = require("../../ui/separator")
const { SidebarTrigger } = require("../../ui/sidebar")

const SiteHeader = () => {
  const pathname = usePathname();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium capitalize">{pathname.split("/").pop()}</h1>
      </div>
    </header>
  )
}

export default SiteHeader;