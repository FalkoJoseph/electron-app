import { create } from "zustand";

import { WINDOW_DIMENSIONS } from "../../../shared/constants";

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
