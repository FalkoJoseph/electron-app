import { useCallback, useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import clsx from "clsx";

import useSidebarStore, {
  setSidebarLeft,
  setSidebarOpenLeft,
  setSidebarResizing,
  setSidebarWidthLeft,
  setSidebarWidthRight,
} from "@/stores/system/sidebar.store";
import useTitlebarStore from "@/stores/system/titlebar.store";
import useWindowStore from "@/stores/system/window.store";

interface SidebarProps {
  align: "left" | "right";
}

const Sidebar = ({ align }: SidebarProps) => {
  const [isAtMin, setIsAtMin] = useState(false);
  const [isAtMax, setIsAtMax] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const windowBackground = useWindowStore((state) => state.background);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const widthLeft = useSidebarStore((state) => state.widthLeft);
  const widthRight = useSidebarStore((state) => state.widthRight);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const minWidth = useSidebarStore((state) => state.minWidth);
  const maxWidth = useSidebarStore((state) => state.maxWidth);

  const currentWidth = align === "left" ? widthLeft : widthRight;

  const getResizeCursor = useCallback(() => {
    if (align === "left") {
      if (isAtMin) return "e-resize";
      if (isAtMax) return "w-resize";
    } else {
      if (isAtMin) return "w-resize";
      if (isAtMax) return "e-resize";
    }
    return "col-resize";
  }, [align, isAtMin, isAtMax]);

  useEffect(() => {
    if (isResizing) {
      document.body.style.cursor = getResizeCursor();
    } else {
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.cursor = "";
    };
  }, [isResizing, getResizeCursor]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "KeyS" && event.altKey && event.metaKey) {
        event.preventDefault();
        setSidebarOpenLeft(!sidebarOpenLeft);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpenLeft]);

  useEffect(() => {
    if (align === "left") {
      setSidebarLeft(true);
    }
  }, [align]);

  const handleResize = (
    _: React.SyntheticEvent,
    { size }: { size: { width: number } },
  ) => {
    if (align === "left") {
      setSidebarWidthLeft(size.width);
    } else {
      setSidebarWidthRight(size.width);
    }

    setIsAtMin(size.width <= minWidth);
    setIsAtMax(size.width >= maxWidth);
  };

  const handleResizeStart = () => {
    setSidebarResizing(true);
    setIsResizing(true);
  };

  const handleResizeStop = () => {
    setSidebarResizing(false);
    setIsResizing(false);
  };

  const leftSidebarIsClosed =
    windowBackground === "transparent" && align === "left" && !sidebarOpenLeft;

  const rightSidebarIsClosed =
    windowBackground === "transparent" &&
    align === "right" &&
    !sidebarOpenRight;

  const sidebarStyle = clsx([
    "absolute top-0 h-full",
    align === "left" && "left-0",
    align === "right" && "right-0",
    align === "left" && sidebarOpenLeft && "drag",
    align === "right" && sidebarOpenRight && "drag",
    align === "left" && "z-10",
    align === "right" && !sidebarOpenRight && "-z-10",
    leftSidebarIsClosed && "opacity-0",
    rightSidebarIsClosed && "opacity-0",
  ]);

  const resizeHandle = (
    <div
      className={clsx(
        "absolute top-0 h-full w-[10px] no-drag",
        align === "left" ? "-right-[5px]" : "-left-[5px]",
      )}
      style={{ cursor: isResizing ? getResizeCursor() : "col-resize" }}
    />
  );

  return (
    <Resizable
      axis={align === "right" ? "x" : "x"}
      draggableOpts={{ enableUserSelectHack: false }}
      handle={resizeHandle}
      height={0}
      maxConstraints={[maxWidth, 0]}
      minConstraints={[minWidth, 0]}
      resizeHandles={align === "right" ? ["w"] : ["e"]}
      style={{ width: currentWidth }}
      width={currentWidth}
      onResize={handleResize}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
    >
      <div
        className={sidebarStyle}
        style={
          align === "left"
            ? { paddingTop: titlebarVisible ? `${titlebarHeight}px` : "53px" }
            : undefined
        }
      >
        <div className="h-full overflow-y-auto">sidebar {align}</div>
      </div>
    </Resizable>
  );
};

export default Sidebar;
