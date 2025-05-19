import "@/uikit/styles/style.css";

import { Outlet } from "react-router";

import { setActiveColor, useSidebarStore, useThemeStore } from "@/uikit/stores";

import { Sidebar, SidebarActions, Window } from "@/uikit";

const Layout = () => {
  const hasLeftSidebar = useSidebarStore((state) => state.hasLeft);
  const hasRightSidebar = useSidebarStore((state) => state.hasRight);
  const activeColor = useThemeStore((state) => state.activeColor);

  setActiveColor(activeColor);

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
