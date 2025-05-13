import { create } from "zustand";

interface State {
  background: string;
  hasPadding: boolean;
}

const initialState: State = {
  background: "bg-white dark:bg-neutral-800/80",
  hasPadding: true,
};

const useWindowStore = create<State>(() => ({
  ...initialState,
}));

export const setWindowBackground = (background: string) => {
  useWindowStore.setState({ background });
};

export const setWindowPadding = (hasPadding: boolean) => {
  useWindowStore.setState({ hasPadding });
};

export default useWindowStore;
