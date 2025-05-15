import { create } from "zustand";

import { WINDOW_DIMENSIONS } from "../../../shared/constants";

interface State {
  name: string;
  windowDimensions: typeof WINDOW_DIMENSIONS;
}

const initialState: State = {
  name: "Electron App",
  windowDimensions: WINDOW_DIMENSIONS,
};

const useAppStore = create<State>(() => ({
  ...initialState,
}));

export default useAppStore;
