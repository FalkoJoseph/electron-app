import { create } from "zustand";

import { setTitlebarBorderOnScroll } from "./titlebar.store";

interface State {
  background: "transparent" | "light" | "dark" | "default";
  mounted: boolean;
}

const initialState: State = {
  background: "light",
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

export default useWindowStore;
