import { create } from "zustand";

interface State {
  background: string;
  backgroundBlur: string;
  hasPadding: boolean;
  mounted: boolean;
}

const initialState: State = {
  background: "bg-white dark:bg-neutral-800/80",
  backgroundBlur: "backdrop-blur-lg",
  hasPadding: true,
  mounted: false,
};

const useWindowStore = create<State>(() => ({
  ...initialState,
}));

export const setWindowMounted = (mounted: boolean) => {
  useWindowStore.setState({ mounted });
};

export const setWindowPadding = (hasPadding: boolean) => {
  useWindowStore.setState({ hasPadding });
};

export default useWindowStore;
