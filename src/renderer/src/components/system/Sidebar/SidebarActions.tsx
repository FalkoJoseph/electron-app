import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import useSidebarStore from "@/stores/sidebar.store";
import useTitlebarStore from "@/stores/titlebar.store";

import TitlebarItem from "@/components/system/Titlebar/TitlebarItem";

interface SidebarProps {
  align: "left" | "right";
}

const SidebarActions = ({ align }: SidebarProps) => {
  const actionsLeft = useSidebarStore((state) => state.actionsLeft);
  const actionsRight = useSidebarStore((state) => state.actionsRight);
  const titlebarHeight = useTitlebarStore((state) => state.height);
  const isTitlebarVisible = useTitlebarStore((state) => state.visible);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.getBoundingClientRect().height;
      setOffset(Math.floor(height / 2));
    }
  }, [actionsLeft, actionsRight]);

  const sidebarActionsStyle = clsx(
    "absolute z-50",
    `sidebar-actions-${align}`,
    align === "left" && "left-21",
    align === "right" && "right-3",
  );

  return (
    <div
      ref={containerRef}
      className={sidebarActionsStyle}
      style={{
        top: isTitlebarVisible ? Math.floor(titlebarHeight / 2) - offset : 10,
      }}
    >
      {align === "left" && actionsLeft && (
        <TitlebarItem align="left">
          {actionsLeft.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </TitlebarItem>
      )}

      {align === "right" && actionsRight && (
        <TitlebarItem align="right">
          {actionsRight.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </TitlebarItem>
      )}
    </div>
  );
};

export default SidebarActions;
