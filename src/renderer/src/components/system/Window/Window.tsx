import { useEffect, useState } from "react";

import clsx from "clsx";

import useWindowStore from "@/stores/window.store";

const Window = ({ children }: { children: React.ReactNode }) => {
  const background = useWindowStore((state) => state.background);
  const hasPadding = useWindowStore((state) => state.hasPadding);
  const [titlebarHeight, setTitlebarHeight] = useState(0);

  const setTitlebar = () => {
    const updateTitlebarHeight = () => {
      const titlebar = document.querySelector(".titlebar");
      if (titlebar) {
        setTitlebarHeight(titlebar.getBoundingClientRect().height);
      }
    };

    updateTitlebarHeight();

    const resizeObserver = new ResizeObserver(updateTitlebarHeight);
    const titlebar = document.querySelector(".titlebar");
    if (titlebar) {
      resizeObserver.observe(titlebar);
    }

    return () => {
      resizeObserver.disconnect();
    };
  };

  useEffect(() => {
    setTitlebar();
  }, []);

  const windowStyle = clsx(
    ["relative z-10 h-full overflow-hidden overflow-y-auto"],
    [background],
  );

  return (
    <div
      className={windowStyle}
      style={{ paddingTop: hasPadding ? `${titlebarHeight}px` : 0 }}
    >
      {children}
    </div>
  );
};

export default Window;
