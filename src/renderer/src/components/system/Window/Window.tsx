import { useEffect, useState } from "react";

import clsx from "clsx";
import { motion } from "motion/react";

import useSidebarStore from "@/stores/sidebar.store";
import useTitlebarStore from "@/stores/titlebar.store";
import useWindowStore, { setWindowMounted } from "@/stores/window.store";

import SidebarActions from "@/components/system/Sidebar/SidebarActions";
import Titlebar from "@/components/system/Titlebar/Titlebar";

const Window = ({ children }: { children: React.ReactNode }) => {
  const windowMounted = useWindowStore((state) => state.mounted);
  const windowBackground = useWindowStore((state) => state.background);
  const sidebarWidthLeft = useSidebarStore((state) => state.widthLeft);
  const sidebarWidthRight = useSidebarStore((state) => state.widthRight);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const sidebarIsResizing = useSidebarStore((state) => state.isResizing);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const [isScrolled, setIsScrolled] = useState(false);

  const windowBackgroundStyle = clsx(
    windowBackground === "default" && "bg-white dark:bg-neutral-800",
    windowBackground === "light" && "bg-white dark:bg-neutral-700",
    windowBackground === "dark" && "bg-neutral-100 dark:bg-neutral-800",
  );

  const innerWindowStyle = clsx(
    "inner-window",
    ["h-full overflow-hidden overflow-y-auto"],
    windowBackground !== "transparent" && [windowBackgroundStyle],
    sidebarOpenLeft && "border-l border-l-black/15 dark:border-l-black/60",
    sidebarOpenRight && "border-r border-r-black/15 dark:border-r-black/60",
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
        duration: windowMounted && !sidebarIsResizing ? 0.15 : 0,
        ease: "linear",
      }}
    >
      {titlebarVisible && (
        <div className="relative">
          <Titlebar isScrolled={isScrolled} />
        </div>
      )}

      <SidebarActions align="left" />

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

export default Window;
