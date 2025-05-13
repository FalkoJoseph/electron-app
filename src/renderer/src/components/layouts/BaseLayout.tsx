import { Outlet } from "react-router";

import Sidebar from "@/components/system/Sidebar/Sidebar";
import SidebarActions from "@/components/system/Sidebar/SidebarActions";

export const BaseLayout = () => {
  return (
    <>
      <div className="h-screen">
        <Sidebar align="left" />
        <SidebarActions align="left" />

        <Outlet />

        <Sidebar align="right" />
        <SidebarActions align="right" />
      </div>
    </>
  );
};

export default BaseLayout;
