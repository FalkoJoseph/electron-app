import { useCallback, useEffect, useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

import clsx from "clsx";
import { Search } from "lucide-react";

import useSidebarStore, {
  setSidebarLeft,
  setSidebarOpenLeft,
  setSidebarResizing,
  setSidebarWidthLeft,
  setSidebarWidthRight,
} from "@/stores/system/sidebar.store";
import useTitlebarStore from "@/stores/system/titlebar.store";
import useWindowStore from "@/stores/system/window.store";

import InputText from "@/components/system/Input/InputText";

interface SidebarProps {
  align: "left" | "right";
}

const Sidebar = ({ align }: SidebarProps) => {
  const [isAtMin, setIsAtMin] = useState(false);
  const [isAtMax, setIsAtMax] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isTransitionComplete, setIsTransitionComplete] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const windowBackground = useWindowStore((state) => state.background);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const titlebarVisible = useTitlebarStore((state) => state.visible);
  const widthLeft = useSidebarStore((state) => state.widthLeft);
  const widthRight = useSidebarStore((state) => state.widthRight);
  const sidebarOpenLeft = useSidebarStore((state) => state.isOpenLeft);
  const sidebarOpenRight = useSidebarStore((state) => state.isOpenRight);
  const minWidth = useSidebarStore((state) => state.minWidth);
  const maxWidth = useSidebarStore((state) => state.maxWidth);
  const contentLeft = useSidebarStore((state) => state.contentLeft);
  const contentRight = useSidebarStore((state) => state.contentRight);
  const hasSearchLeft = useSidebarStore((state) => state.hasSearchLeft);
  const hasSearchRight = useSidebarStore((state) => state.hasSearchRight);
  const search = useSidebarStore((state) => state.search);

  const currentWidth = align === "left" ? widthLeft : widthRight;
  const hasSearch = align === "left" ? hasSearchLeft : hasSearchRight;

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

  // Handle transition timing
  useEffect(() => {
    if (sidebarOpenLeft || sidebarOpenRight) {
      const timer = setTimeout(() => {
        setIsTransitionComplete(true);
      }, 180);
      return () => clearTimeout(timer);
    } else {
      setIsTransitionComplete(false);
    }

    return () => {
      setIsTransitionComplete(false);
    };
  }, [sidebarOpenLeft, sidebarOpenRight]);

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
    "absolute top-0 h-full transition-opacity duration-100",
    align === "left" && "left-0",
    align === "right" && "right-0",
    align === "left" && sidebarOpenLeft && "drag",
    align === "right" && sidebarOpenRight && "drag",
    align === "left" && sidebarOpenLeft && isTransitionComplete && "z-10",
    align === "right" && !sidebarOpenRight && "-z-10",
    align === "right" && sidebarOpenRight && isTransitionComplete && "z-20",
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

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    setIsScrolled(scrollTop > 0);
  };

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
        <div className="flex flex-col h-full">
          {hasSearch && (
            <div
              className={clsx([
                "flex items-center justify-between no-drag px-2.5 pb-3.5 transition-all duration-100",
                align === "left" && "pt-1",
                align === "right" && "pt-2.5",
                isScrolled
                  ? "border-b border-black/20 dark:border-black/60 shadow-bottom"
                  : "border-b border-transparent",
              ])}
            >
              <InputText
                iconPrefix={<Search size={15} />}
                placeholder={search.placeholder ?? ""}
                variant="sidebar"
                isClearable
                isRounded
                onChange={search.handleChange}
              />
            </div>
          )}
          <div className="h-full overflow-y-auto" onScroll={handleScroll}>
            {align === "left" && contentLeft}
            {align === "right" && contentRight}
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default Sidebar;
