import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  isOpenLeft: boolean;
  isOpenRight: boolean;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  isOpenLeft: false,
  isOpenRight: false,
};

const useSidebarStore = create<State>(() => ({
  ...initialState,
}));

export const setSidebarOpenLeft = (isOpenLeft: boolean) => {
  useSidebarStore.setState({ isOpenLeft });
};

export const setSidebarOpenRight = (isOpenRight: boolean) => {
  useSidebarStore.setState({ isOpenRight });
};

export const setSidebarActionsLeft = (actionsLeft: React.ReactNode[]) => {
  useSidebarStore.setState({ actionsLeft });
};

export const setSidebarActionsRight = (actionsRight: React.ReactNode[]) => {
  useSidebarStore.setState({ actionsRight });
};

export default useSidebarStore;
