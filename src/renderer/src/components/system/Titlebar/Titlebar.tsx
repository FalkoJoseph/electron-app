import { useEffect, useState } from "react";

import clsx from "clsx";

import TitlebarItem from "./TitlebarItem";

import { useTitlebarHeight } from "@/hooks/useTitlebarHeight.hook";
import { useTrafficLight } from "@/hooks/useTrafficLight.hook";

import useSidebarStore from "@/stores/sidebar.store";
import useTitlebarStore, {
  setTrafficLightPosition,
} from "@/stores/titlebar.store";

const Titlebar = () => {
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarActionsLeft = useTitlebarStore((state) => state.actionsLeft);
  const titlebarActionsRight = useTitlebarStore((state) => state.actionsRight);
  const title = useTitlebarStore((state) => state.title);
  const subtitle = useTitlebarStore((state) => state.subtitle);
  const hasBackground = useTitlebarStore((state) => state.hasBackground);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
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
      const trafficLightWidth = 85;
      setLeftActionsWidth(
        leftActions.getBoundingClientRect().width + trafficLightWidth,
      );
    }
    if (rightActions && rightActions.getBoundingClientRect().width > 0) {
      const gap = 8;
      setRightActionsWidth(rightActions.getBoundingClientRect().width + gap);
    }
  }, [titlebarActionsLeft, titlebarActionsRight]);

  const titlebarStyle = clsx([
    "titlebar z-40 drag absolute w-full z-10 flex items-center justify-between px-2.5 py-2.5 text-center text-sm text-black/80 transition-shadow duration-100 border-b border-black/10",
    hasBackground && "bg-white/80 backdrop-blur-lg dark:bg-neutral-700/80",
    "dark:text-white/80 dark:border-black/60",
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
        <TitlebarItem align="right">
          {titlebarActionsRight &&
            titlebarActionsRight.map((action, index) => (
              <TitlebarItem key={index} align="right">
                {action}
              </TitlebarItem>
            ))}
        </TitlebarItem>
      </div>
    </div>
  );
};

export default Titlebar;
