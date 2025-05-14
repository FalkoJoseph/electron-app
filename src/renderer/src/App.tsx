import { useEffect } from "react";

import useSidebarStore, {
  setSidebarActionsLeft,
  setSidebarLeft,
  setSidebarOpenLeft,
} from "@/stores/system/sidebar.store";
import {
  setTitlebarActionsRight,
  setTitlebarAlign,
  setTitlebarVisible,
} from "@/stores/system/titlebar.store";
import { setWindowBackground } from "@/stores/system/window.store";

import IconSidebar from "@/assets/svg/IconSidebar";
import Button from "@/components/system/Button/Button";

export const useApp = () => {
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);

  useEffect(() => {
    // Window
    setWindowBackground("dark");

    // Titlebar
    setTitlebarVisible(true);
    setTitlebarAlign("center");

    // Sidebar
    setSidebarLeft(true);
    setSidebarOpenLeft(true);
  }, []);

  useEffect(() => {
    setSidebarActionsLeft([
      <Button
        key="sidebar"
        size="icon"
        variant="transparent"
        onClick={() => setSidebarOpenLeft(!sidebarOpenLeft)}
      >
        <IconSidebar className="size-5" />
      </Button>,
    ]);

    setTitlebarActionsRight([
      <Button key="chat" size="large" variant="default">
        Chat
      </Button>,
    ]);
  }, [sidebarOpenLeft]);
};
