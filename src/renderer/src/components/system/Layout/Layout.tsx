import { Outlet } from "react-router";

import useSidebarStore from "@/stores/system/sidebar.store";

import { useApp } from "@/App";
import Sidebar from "@/components/system/Sidebar/Sidebar";
import SidebarActions from "@/components/system/Sidebar/SidebarActions";
import Window from "@/components/system/Window/Window";

export const Layout = () => {
  const hasLeftSidebar = useSidebarStore((state) => state.hasLeft);
  const hasRightSidebar = useSidebarStore((state) => state.hasRight);

  useApp();

  return (
    <>
      <div className="h-screen">
        {hasLeftSidebar && <Sidebar align="left" />}
        {hasLeftSidebar && <SidebarActions align="left" />}

        <Window>
          <Outlet />
        </Window>

        {hasRightSidebar && <Sidebar align="right" />}
        {hasRightSidebar && <SidebarActions align="right" />}
      </div>
    </>
  );
};

export default Layout;
