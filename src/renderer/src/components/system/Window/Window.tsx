import { useEffect } from "react";

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
  const windowHasBackground = useWindowStore((state) => state.hasBackground);
  const sidebarWidthLeft = useSidebarStore((state) => state.widthLeft);
  const sidebarWidthRight = useSidebarStore((state) => state.widthRight);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const sidebarIsResizing = useSidebarStore((state) => state.isResizing);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const titlebarHeight = useTitlebarStore((state) => state.height);

  const innerWindowStyle = clsx(
    ["h-full overflow-hidden overflow-y-auto"],
    windowHasBackground && [windowBackground],
  );

  useEffect(() => {
    setTimeout(() => {
      setWindowMounted(true);
    }, 1);
  }, []);

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
          <Titlebar />
        </div>
      )}

      <SidebarActions align="left" />

      <div
        className="relative h-full"
        style={{
          paddingTop: `${titlebarHeight}px`,
        }}
      >
        <div className={innerWindowStyle}>{children}</div>
      </div>
    </motion.div>
  );
};

export default Window;
