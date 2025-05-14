import { useEffect, useState } from "react";

import clsx from "clsx";

import TitlebarItem from "./TitlebarItem";

import { useTitlebarHeight } from "@/hooks/system/useTitlebarHeight.hook";
import { useTrafficLight } from "@/hooks/system/useTrafficLight.hook";

import useSidebarStore from "@/stores/system/sidebar.store";
import useTitlebarStore, {
  setTrafficLightPosition,
} from "@/stores/system/titlebar.store";
import useWindowStore from "@/stores/system/window.store";

interface TitlebarProps {
  isScrolled: boolean;
}

const Titlebar = ({ isScrolled }: TitlebarProps) => {
  const windowBackground = useWindowStore((state) => state.background);
  const isFullscreen = useWindowStore((state) => state.isFullscreen);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarActionsLeft = useTitlebarStore((state) => state.actionsLeft);
  const titlebarActionsRight = useTitlebarStore((state) => state.actionsRight);
  const title = useTitlebarStore((state) => state.title);
  const subtitle = useTitlebarStore((state) => state.subtitle);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const borderOnScroll = useTitlebarStore((state) => state.borderOnScroll);
  const [leftActionsWidth, setLeftActionsWidth] = useState(0);
  const [rightActionsWidth, setRightActionsWidth] = useState(0);

  useTitlebarHeight();
  useTrafficLight();

  useEffect(() => {
    setTrafficLightPosition({
      x: 17,
      y: Math.floor(titlebarHeight / 2) - 8,
    });
  }, [titlebarHeight]);

  useEffect(() => {
    const leftActions = document.querySelector(".sidebar-actions-left");
    const rightActions = document.querySelector(".sidebar-actions-right");

    if (leftActions && leftActions.getBoundingClientRect().width > 0) {
      const trafficLightWidth = isFullscreen ? 10 : 85;
      setLeftActionsWidth(
        leftActions.getBoundingClientRect().width + trafficLightWidth,
      );
    }
    if (rightActions && rightActions.getBoundingClientRect().width > 0) {
      const gap = 8;
      setRightActionsWidth(rightActions.getBoundingClientRect().width + gap);
    }
  }, [titlebarActionsLeft, titlebarActionsRight, isFullscreen]);

  const titlebarStyle = clsx([
    "titlebar z-40 drag absolute w-full z-10 flex items-center justify-between px-2.5 py-2.5 text-center text-sm text-black/80 transition-[border-bottom-color] duration-200 dark:text-white/80",
    windowBackground === "default" && "bg-neutral-100 dark:bg-neutral-700",
    windowBackground === "light" && "bg-white dark:bg-neutral-700",
    windowBackground === "dark" && "bg-neutral-100 dark:bg-neutral-800",
    sidebarOpenLeft && "border-l border-l-black/15 dark:border-l-black/60",
    sidebarOpenRight && "border-r border-r-black/15 dark:border-r-black/60",
    borderOnScroll
      ? isScrolled
        ? "border-b border-black/15 dark:border-black/60 titlebar-shadow"
        : "border-b border-b-transparent"
      : "border-b border-black/15 dark:border-black/60",
  ]);

  return (
    <div className={titlebarStyle}>
      <div
        className="w-1/3"
        style={{
          paddingLeft:
            !sidebarOpenLeft && titlebarActionsLeft?.length
              ? `${leftActionsWidth}px`
              : "0px",
        }}
      >
        {titlebarActionsLeft &&
          titlebarActionsLeft.map((action, index) => (
            <TitlebarItem key={index} align="left">
              {action}
            </TitlebarItem>
          ))}
      </div>

      <div className="w-1/3">
        {title && <p>{title}</p>}
        {subtitle && <p className="text-xxs opacity-70">{subtitle}</p>}
      </div>

      <div
        className="w-1/3"
        style={{
          paddingRight:
            !sidebarOpenRight && titlebarActionsRight?.length
              ? `${rightActionsWidth}px`
              : "0px",
        }}
      >
        {titlebarActionsRight &&
          titlebarActionsRight.map((action, index) => (
            <TitlebarItem key={index} align="right">
              {action}
            </TitlebarItem>
          ))}
      </div>
    </div>
  );
};

export default Titlebar;
