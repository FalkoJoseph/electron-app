import { useEffect } from "react";

import clsx from "clsx";
import { motion } from "motion/react";

import useSidebarStore from "@/stores/sidebar.store";
import useTitlebarStore from "@/stores/titlebar.store";
import useWindowStore, { setWindowMounted } from "@/stores/window.store";

import SidebarActions from "@/components/system/Sidebar/SidebarActions";
import Titlebar from "@/components/system/Titlebar/Titlebar";

const Window = ({ children }: { children: React.ReactNode }) => {
  const mounted = useWindowStore((state) => state.mounted);
  const background = useWindowStore((state) => state.background);
  const hasPadding = useWindowStore((state) => state.hasPadding);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const sidebarWidth = useSidebarStore((state) => state.width);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const windowStyle = clsx(["relative h-full"]);

  const innerWindowStyle = clsx(
    ["h-full overflow-hidden overflow-y-auto"],
    [background],
  );

  useEffect(() => {
    setTimeout(() => {
      setWindowMounted(true);
    }, 1);
  }, []);

  return (
    <motion.div
      animate={{
        paddingLeft: sidebarOpenLeft ? sidebarWidth : 0,
        paddingRight: sidebarOpenRight ? sidebarWidth : 0,
      }}
      className="relative w-full h-full"
      transition={{ duration: mounted ? 0.15 : 0, ease: "linear" }}
    >
      {titlebarVisible && (
        <div className="relative">
          <Titlebar />
        </div>
      )}

      <SidebarActions align="left" />

      <div
        className={windowStyle}
        style={{
          paddingTop: hasPadding ? `${titlebarHeight}px` : 0,
        }}
      >
        <div className={innerWindowStyle}>{children}</div>
      </div>
    </motion.div>
  );
};

export default Window;
