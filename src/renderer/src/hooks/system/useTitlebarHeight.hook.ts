import { useEffect } from "react";

import { setTitlebarHeight } from "@/stores/titlebar.store";

export const useTitlebarHeight = () => {
  useEffect(() => {
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
  }, []);
};
