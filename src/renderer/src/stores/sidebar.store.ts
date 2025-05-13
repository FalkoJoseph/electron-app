import { create } from "zustand";

interface State {
  isOpenLeft: boolean;
  isOpenRight: boolean;
}

const initialState: State = {
  isOpenLeft: false,
  isOpenRight: false,
};

const useSidebarStore = create<State>(() => ({
  ...initialState,
}));

export const setIsOpenLeft = (isOpenLeft: boolean) => {
  useSidebarStore.setState({ isOpenLeft });
};

export const setIsOpenRight = (isOpenRight: boolean) => {
  useSidebarStore.setState({ isOpenRight });
};

export default useSidebarStore;
