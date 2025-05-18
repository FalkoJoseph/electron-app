import { create } from "zustand";

import { setTitlebarBorderOnScroll } from "@/uikit/stores";

interface State {
  background: "transparent" | "light" | "dark" | "default";
  isFullscreen: boolean;
  mounted: boolean;
}

const initialState: State = {
  background: "light",
  isFullscreen: false,
  mounted: false,
};

const useWindowStore = create<State>(() => ({
  ...initialState,
}));

export const setWindowMounted = (mounted: boolean) => {
  useWindowStore.setState({ mounted });
};

export const setWindowBackground = (
  background: "light" | "dark" | "transparent" | "default",
) => {
  useWindowStore.setState({ background });
  setTitlebarBorderOnScroll(background !== "default");
};

export const setWindowFullscreen = (isFullscreen: boolean) => {
  useWindowStore.setState({ isFullscreen });
};

export { useWindowStore };
