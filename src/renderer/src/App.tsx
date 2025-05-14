import { useEffect } from "react";

import useSidebarStore, {
  setSidebarActionsLeft,
  setSidebarOpenLeft,
  setSidebarOpenRight,
} from "@/stores/system/sidebar.store";
import {
  setTitlebarActionsRight,
  setTitlebarVisible,
} from "@/stores/system/titlebar.store";
import { setWindowBackground } from "@/stores/system/window.store";

import IconSidebar from "@/assets/svg/IconSidebar";
import Button from "@/components/system/Button/Button";

export const useApp = () => {
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);

  useEffect(() => {
    setWindowBackground("dark");
    setTitlebarVisible(true);
    setSidebarOpenLeft(true);
    setSidebarOpenRight(false);
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
      <Button
        key="chat"
        size="large"
        variant="default"
        onClick={() => setSidebarOpenRight(!sidebarOpenRight)}
      >
        Chat
      </Button>,
    ]);
  }, [sidebarOpenLeft, sidebarOpenRight]);
};
