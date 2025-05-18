import { useEffect } from "react";

import { Award, Box, Columns3, Search, Share } from "lucide-react";

import {
  setPrimaryColor,
  setSidebarActionsLeft,
  setSidebarContentLeft,
  setSidebarLeft,
  setSidebarOpenLeft,
  setSidebarSearch,
  setTitlebarActionsRight,
  setTitlebarAlign,
  setTitlebarSize,
  setTitlebarVisible,
  setWindowBackground,
  useSidebarStore,
  useThemeStore,
} from "@/uikit/stores";

import { Button, IconSidebar, InputText, Navigation } from "@/uikit";

export const useApp = () => {
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const primaryColor = useThemeStore((state) => state.primaryColor);

  // Initial setup - only runs once
  useEffect(() => {
    // Default color
    setPrimaryColor("blue");

    // Window background
    setWindowBackground("dark");

    // Titlebar
    setTitlebarVisible(true);
    setTitlebarSize("large");
    setTitlebarAlign("left");

    // Titlebar actions
    setTitlebarActionsRight([
      <Button key="sidebar" size="icon" variant="transparent">
        <Share size="18" />
      </Button>,
      <InputText
        key="search"
        iconPrefix={<Search size={15} />}
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
    setSidebarSearch({
      handleChange: (value) => {
        console.log("searching:", value);
      },
      placeholder: "Search",
    });
  }, []);

  // Navigation - only runs when the primary color changes
  useEffect(() => {
    const navigation = [
      {
        activeColor: primaryColor,
        dragAndDrop: {
          enableGroupDrag: true,
          enableItemDrag: true,
        },
        items: [
          {
            icon: <Box />,
            label: "Components",
            path: "/",
          },
          {
            icon: <Columns3 />,
            label: "Split view",
            path: "split-view",
          },
          {
            icon: <Award />,
            label: "Credits",
            path: "credits",
          },
        ],
        label: "Library",
      },
    ];

    setSidebarContentLeft(<Navigation contents={navigation} />);
  }, [primaryColor]);

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
