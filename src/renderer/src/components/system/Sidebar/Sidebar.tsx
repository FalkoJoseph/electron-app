import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

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

  const sidebarWidth = useSidebarStore((state) => state.width);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const minWidth = useSidebarStore((state) => state.minWidth);
  const maxWidth = useSidebarStore((state) => state.maxWidth);

  const handleResize = (
    _: React.SyntheticEvent,
    { size }: { size: { width: number } },
  ) => {
    useSidebarStore.setState({ width: size.width });
  };

  const sidebarStyle = clsx(
    "absolute top-0 h-full border-black/10 dark:border-black/60",
    mounted && "transition duration-100 ease-linear",
    [backgroundBlur],
    align === "left" && "left-0 border-r",
    align === "right" && "right-0 border-l",
    align === "left" && !sidebarOpenLeft && "opacity-0",
    align === "right" && !sidebarOpenRight && "opacity-0",
    align === "left" && sidebarOpenLeft && "drag",
    align === "right" && sidebarOpenRight && "drag",
  );

  const resizeHandle = (
    <div
      className={clsx(
        "absolute top-0 no-drag h-full w-1 cursor-col-resize bg-red-500 hover:bg-blue-500",
        align === "left" ? "right-0" : "left-0",
      )}
    />
  );

  return (
    <Resizable
      draggableOpts={{ enableUserSelectHack: false }}
      handle={resizeHandle}
      height={0}
      maxConstraints={[maxWidth, 0]}
      minConstraints={[minWidth, 0]}
      style={{ width: sidebarWidth }}
      width={sidebarWidth}
      onResize={handleResize}
    >
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
    </Resizable>
  );
};

export default Sidebar;
