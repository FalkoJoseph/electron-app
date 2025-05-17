import { WINDOW_DIMENSIONS } from "@root/shared/constants";
import { create } from "zustand";

interface State {
  windowDimensions: typeof WINDOW_DIMENSIONS;
}

const initialState: State = {
  // Important: also edit the `productName` and `appId` in `/electron-builder.yml`
  windowDimensions: WINDOW_DIMENSIONS,
};

const useAppStore = create<State>(() => ({
  ...initialState,
}));

export default useAppStore;
