import { create } from "zustand";

interface State {
  background: string;
  hasBackground: boolean;
  mounted: boolean;
}

const initialState: State = {
  background: "bg-white dark:bg-neutral-800/80",
  hasBackground: false,
  mounted: false,
};

const useWindowStore = create<State>(() => ({
  ...initialState,
}));

export const setWindowMounted = (mounted: boolean) => {
  useWindowStore.setState({ mounted });
};

export const setWindowBackground = (hasBackground: boolean) => {
  useWindowStore.setState({ hasBackground });
};

export default useWindowStore;
