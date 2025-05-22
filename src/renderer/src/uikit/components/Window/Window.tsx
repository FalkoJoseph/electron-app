import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { motion } from "motion/react";

import {
  setSidebarOpenLeft,
  setSidebarOpenRight,
  setWindowMounted,
  useAppStore,
  useSidebarStore,
  useTitlebarStore,
  useWindowStore,
} from "@/uikit/stores";

import { SidebarActions, Titlebar, useFullscreen } from "@/uikit";

interface WindowProps {
  children: React.ReactNode;
}

const Window = ({ children }: WindowProps) => {
  const windowMounted = useWindowStore((state) => state.mounted);
  const windowBackground = useWindowStore((state) => state.background);
  const hasLeftSidebar = useSidebarStore((state) => state.hasLeft);
  const sidebarWidthLeft = useSidebarStore((state) => state.widthLeft);
  const sidebarWidthRight = useSidebarStore((state) => state.widthRight);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const sidebarIsResizing = useSidebarStore((state) => state.isResizing);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const windowWidth = useAppStore((state) => state.windowDimensions.width);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isWindowResizing, setIsWindowResizing] = useState(false);
  const [wasLeftSidebarOpen, setWasLeftSidebarOpen] = useState(false);
  const [wasRightSidebarOpen, setWasRightSidebarOpen] = useState(false);
  const resizeTimeoutRef = useRef<number | undefined>(undefined);

  useFullscreen();

  useEffect(() => {
    const handleResize = () => {
      if (isResizing) return;

      const currentWindowWidth = window.innerWidth;

      if (currentWindowWidth < windowWidth) {
        if (sidebarOpenLeft) {
          setWasLeftSidebarOpen(true);
          setSidebarOpenLeft(false);
        }
        if (sidebarOpenRight) {
          setWasRightSidebarOpen(true);
          setSidebarOpenRight(false);
        }
      } else {
        if (wasLeftSidebarOpen) {
          setSidebarOpenLeft(true);
          setWasLeftSidebarOpen(false);
        }
        if (wasRightSidebarOpen) {
          setSidebarOpenRight(true);
          setWasRightSidebarOpen(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    sidebarOpenLeft,
    sidebarOpenRight,
    isResizing,
    wasLeftSidebarOpen,
    wasRightSidebarOpen,
    windowWidth,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsWindowResizing(true);

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(() => {
        setIsWindowResizing(false);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isResizing) return;

    const currentWindowWidth = window.innerWidth;
    const requiredWidth = windowWidth;

    if (
      currentWindowWidth < windowWidth &&
      requiredWidth > currentWindowWidth &&
      (sidebarOpenLeft || sidebarOpenRight)
    ) {
      setIsResizing(true);
      window.api.resizeWindow(requiredWidth);
      setTimeout(() => setIsResizing(false), 100);
    }
  }, [sidebarOpenLeft, sidebarOpenRight, isResizing, windowWidth]);

  const hasTitlebarShadow =
    windowBackground === "default" ||
    windowBackground === "light" ||
    windowBackground === "dark";

  const windowBackgroundStyle = clsx(
    windowBackground === "default" && "bg-white dark:bg-zinc-700",
    windowBackground === "light" && "bg-white dark:bg-zinc-700",
    windowBackground === "dark" && "bg-neutral-100 dark:bg-zinc-800",
    hasTitlebarShadow && "shadow-x",
  );

  const innerWindowStyle = clsx(
    "inner-window",
    ["h-full overflow-hidden overflow-y-auto"],
    windowBackground !== "transparent" && [windowBackgroundStyle],
    sidebarOpenLeft && "border-l border-l-black/20 dark:border-l-black/60",
    sidebarOpenRight && "border-r border-r-black/20 dark:border-r-black/60",
  );

  useEffect(() => {
    setTimeout(() => {
      setWindowMounted(true);
    }, 1);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

  return (
    <motion.div
      animate={{
        paddingLeft: sidebarOpenLeft ? sidebarWidthLeft : 0,
        paddingRight: sidebarOpenRight ? sidebarWidthRight : 0,
      }}
      className={clsx("relative w-full h-full", {
        "z-20": !sidebarOpenLeft,
      })}
      transition={{
        duration:
          windowMounted && !sidebarIsResizing && !isWindowResizing ? 0.18 : 0,
        ease: "linear",
      }}
    >
      {titlebarVisible && (
        <div className="relative">
          <Titlebar isScrolled={isScrolled} />
        </div>
      )}

      {hasLeftSidebar && <SidebarActions align="left" />}

      <div
        className="relative h-full"
        style={{
          paddingTop: `${titlebarHeight}px`,
        }}
      >
        <div className={innerWindowStyle} onScroll={handleScroll}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export { Window };
