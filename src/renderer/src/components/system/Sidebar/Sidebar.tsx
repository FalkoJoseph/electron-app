import clsx from "clsx";

import useSidebarStore from "@/stores/sidebar.store";
import useTitlebarStore from "@/stores/titlebar.store";
import useWindowStore from "@/stores/window.store";

interface SidebarProps {
  align: "left" | "right";
}

const Sidebar = ({ align }: SidebarProps) => {
  const backgroundBlur = useWindowStore((state) => state.backgroundBlur);
  const mounted = useWindowStore((state) => state.mounted);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarVisible = useTitlebarStore((state) => state.visible);

  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);

  const sidebarStyle = clsx(
    "w-[200px] absolute top-0 h-full z-0 border-black/10 dark:border-black/60",
    mounted && "transition duration-100 ease-linear",
    [backgroundBlur],
    align === "left" && "left-0 border-r",
    align === "right" && "right-0 border-l",
    align === "left" && !sidebarOpenLeft && "opacity-0",
    align === "right" && !sidebarOpenRight && "opacity-0",
    align === "left" && sidebarOpenLeft && "drag",
    align === "right" && sidebarOpenRight && "drag",
  );

  return (
    <div
      className={sidebarStyle}
      style={
        align === "left"
          ? { paddingTop: titlebarVisible ? `${titlebarHeight}px` : "50px" }
          : undefined
      }
    >
      <div className="h-full overflow-y-auto">sidebar {align}</div>
    </div>
  );
};

export default Sidebar;
