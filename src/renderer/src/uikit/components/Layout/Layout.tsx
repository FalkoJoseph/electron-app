import { Outlet } from "react-router";

import useSidebarStore from "@/uikit/stores/sidebar.store";

import { Sidebar } from "@/uikit/components/Sidebar";
import { SidebarActions } from "@/uikit/components/Sidebar";
import { Window } from "@/uikit/components/Window";

const Layout = () => {
  const hasLeftSidebar = useSidebarStore((state) => state.hasLeft);
  const hasRightSidebar = useSidebarStore((state) => state.hasRight);

  return (
    <>
      <div className="h-screen">
        {hasLeftSidebar && <Sidebar align="left" />}

        <Window>
          <Outlet />
        </Window>

        {hasRightSidebar && <Sidebar align="right" />}
        {hasRightSidebar && <SidebarActions align="right" />}
      </div>
    </>
  );
};

export { Layout };
