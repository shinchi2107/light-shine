import AppSidebarManage from "@/src/components/app/app-sidebar-manage";
import SiteHeader from "@/src/components/layout/manage/site-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";

const ManageLayout = ({ children }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebarManage variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              {children}
            </div>
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}

export default ManageLayout;