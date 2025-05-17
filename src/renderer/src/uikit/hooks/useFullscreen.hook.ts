import { useEffect } from "react";

import { setWindowFullscreen } from "@/uikit/stores/window.store";

export const useFullscreen = () => {
  useEffect(() => {
    const handleFullscreenChange = (isFullscreen: boolean) => {
      setWindowFullscreen(isFullscreen);
    };

    // Check initial fullscreen state
    window.api.getFullscreenState().then((isFullscreen) => {
      setWindowFullscreen(isFullscreen);
    });

    // Listen for fullscreen changes
    window.api.onFullscreenChange(handleFullscreenChange);
  }, []);
};
