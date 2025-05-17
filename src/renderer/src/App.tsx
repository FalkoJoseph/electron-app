import { useEffect } from "react";

import {
  RiBookmarkLine,
  RiHome5Line,
  RiListUnordered,
  RiSearchLine,
  RiShare2Line,
} from "@remixicon/react";

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
import InputText from "@/components/system/Input/InputText";
import Navigation, {
  type ColorName,
} from "@/components/system/Navigation/Navigation";

export const useApp = () => {
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);

  useEffect(() => {
    // Navigation
    const navigation = [
      {
        activeColor: "blue" as ColorName,
        dragAndDrop: {
          enableGroupDrag: true,
          enableItemDrag: true,
        },
        items: [
          {
            icon: <RiHome5Line />,
            label: "Components",
            path: "/",
          },
          {
            icon: <RiBookmarkLine />,
            label: "Bookmarks",
            path: "bookmarks",
          },
          {
            icon: <RiListUnordered />,
            label: "Credits",
            path: "credits",
          },
        ],
        label: "Library",
      },
    ];

    // Window
    setWindowBackground("dark");

    // Titlebar
    setTitlebarVisible(true);
    setTitlebarSize("large");
    setTitlebarAlign("left");

    // Titlebar actions
    setTitlebarActionsRight([
      <Button key="sidebar" size="icon" variant="transparent">
        <RiShare2Line size="22" />
      </Button>,
      <InputText
        key="search"
        iconPrefix={<RiSearchLine size={15} />}
        placeholder="Search"
        variant="search"
        isClearable
        isRounded
        onChange={(value) => {
          console.log("searching:", value);
        }}
      />,
    ]);

    // Sidebar
    setSidebarLeft(true);
    setSidebarOpenLeft(true);
    setSidebarContentLeft(<Navigation contents={navigation} />);
    setSidebarSearch({
      handleChange: (value) => {
        console.log("searching:", value);
      },
      placeholder: "Search",
    });
  }, []);

  // Sidebar actions
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
  }, [sidebarOpenLeft]);
};
