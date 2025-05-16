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
  const titlebarSize = useTitlebarStore((state) => state.size);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarActionsLeft = useTitlebarStore((state) => state.actionsLeft);
  const titlebarActionsRight = useTitlebarStore((state) => state.actionsRight);
  const titlebarAlign = useTitlebarStore((state) => state.align);
  const title = useTitlebarStore((state) => state.title);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const borderOnScroll = useTitlebarStore((state) => state.borderOnScroll);
  const [leftActionsWidth, setLeftActionsWidth] = useState(0);
  const [rightActionsWidth, setRightActionsWidth] = useState(0);

  useTitlebarHeight();
  useTrafficLight();

  useEffect(() => {
    setTrafficLightPosition({
      x: titlebarSize === "small" ? 10 : 17,
      y: Math.floor(titlebarHeight / 2) - 8,
    });
  }, [titlebarHeight, titlebarSize]);

  useEffect(() => {
    const trafficLightWidth = isFullscreen
      ? 10
      : titlebarSize === "small"
        ? 78
        : 80;
    const leftActions = document.querySelector(".sidebar-actions-left");
    const rightActions = document.querySelector(".sidebar-actions-right");

    if (leftActions && leftActions.getBoundingClientRect().width > 0) {
      setLeftActionsWidth(
        leftActions.getBoundingClientRect().width + trafficLightWidth,
      );
    } else {
      setLeftActionsWidth(trafficLightWidth);
    }

    if (rightActions && rightActions.getBoundingClientRect().width > 0) {
      const gap = 8;
      setRightActionsWidth(rightActions.getBoundingClientRect().width + gap);
    }
  }, [titlebarActionsLeft, titlebarActionsRight, isFullscreen, titlebarSize]);

  const titlebarStyle = clsx([
    "titlebar z-40 drag absolute w-full z-10 flex items-center justify-between text-sm text-black/80 transition-[background-color] duration-200 dark:text-white/80",
    windowBackground === "default" && "bg-neutral-100 dark:bg-neutral-700",
    windowBackground === "light" && "bg-white dark:bg-neutral-700",
    windowBackground === "dark" && "bg-neutral-100 dark:bg-neutral-800",
    titlebarSize === "small" && "p-1",
    titlebarSize === "large" && "px-2.5 py-2.5",
    sidebarOpenLeft
      ? "border-l border-l-black/20 dark:border-l-black/60"
      : "border-l border-l-transparent",
    sidebarOpenRight
      ? "border-r border-r-black/20 dark:border-r-black/60"
      : "border-r border-r-transparent",
    borderOnScroll
      ? isScrolled
        ? "shadow-x-y bg-neutral-200 dark:bg-neutral-800"
        : "shadow-x"
      : "border-b border-black/15 dark:border-black/60",
  ]);

  return (
    <div className={titlebarStyle}>
      <div
        className={clsx([titlebarAlign === "left" && "hidden"])}
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

      <div
        className={clsx([
          "flex-1",
          titlebarAlign === "center" && "text-center",
        ])}
        style={{
          paddingLeft:
            !sidebarOpenLeft && titlebarAlign === "left"
              ? `${leftActionsWidth}px`
              : "0px",
        }}
      >
        {title &&
          (typeof title === "string" ? (
            <p
              className={clsx([
                "text-system font-bold",
                titlebarAlign === "left" && "pl-2",
              ])}
            >
              {title}
            </p>
          ) : (
            title
          ))}
      </div>

      <div
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
