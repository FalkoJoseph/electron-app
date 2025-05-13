import { Outlet } from "react-router";

import { useApp } from "@/App";
import Sidebar from "@/components/system/Sidebar/Sidebar";
import SidebarActions from "@/components/system/Sidebar/SidebarActions";
import Window from "@/components/system/Window/Window";

export const BaseLayout = () => {
  useApp();

  return (
    <>
      <div className="h-screen">
        <Sidebar align="left" />

        <Window>
          <Outlet />
        </Window>

        <Sidebar align="right" />
        <SidebarActions align="right" />
      </div>
    </>
  );
};

export default BaseLayout;
