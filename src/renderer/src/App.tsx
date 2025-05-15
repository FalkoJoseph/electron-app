import { useEffect } from "react";

import { RiBookmarkLine, RiHome5Line, RiShare2Line } from "@remixicon/react";

import useSidebarStore, {
  setSidebarActionsLeft,
  setSidebarContentLeft,
  setSidebarLeft,
  setSidebarOpenLeft,
  setSidebarSearch,
} from "@/stores/system/sidebar.store";
import {
  setTitlebarActionsRight,
  setTitlebarAlign,
  setTitlebarSize,
  setTitlebarVisible,
} from "@/stores/system/titlebar.store";
import { setWindowBackground } from "@/stores/system/window.store";

import IconSidebar from "@/assets/svg/IconSidebar";
import Button from "@/components/system/Button/Button";
import Navigation, {
  type ColorName,
} from "@/components/system/Navigation/Navigation";

export const useApp = () => {
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);

  useEffect(() => {
    // Navigation
    const navigation = [
      {
        activeColor: "blue" as ColorName,
        items: [
          {
            icon: <RiHome5Line />,
            label: "Home",
            path: "/",
          },
          {
            icon: <RiBookmarkLine />,
            label: "Bookmarks",
            path: "bookmarks",
          },
        ],
        label: "Contents",
      },
    ];

    // Window
    setWindowBackground("dark");

    // Titlebar
    setTitlebarVisible(true);
    setTitlebarSize("large");
    setTitlebarAlign("center");

    // Sidebar
    setSidebarLeft(true);
    setSidebarOpenLeft(true);
    setSidebarContentLeft(<Navigation contents={navigation} />);
    setSidebarSearch({
      handleChange: (value) => {
        console.log("from the sidebar:", value);
      },
      placeholder: "Search",
    });
  }, []);

  useEffect(() => {
    // Titlebar actions
    setTitlebarActionsRight([
      <Button key="sidebar" size="icon" variant="transparent">
        <RiShare2Line className="size-5" />
      </Button>,
    ]);

    // Sidebar actions
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
  }, [sidebarOpenLeft, sidebarOpenRight]);
};
