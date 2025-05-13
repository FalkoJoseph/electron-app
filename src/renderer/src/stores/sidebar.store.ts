import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  isOpenLeft: boolean;
  isOpenRight: boolean;
  maxWidth: number;
  minWidth: number;
  width: number;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  isOpenLeft: false,
  isOpenRight: false,
  maxWidth: 300,
  minWidth: 150,
  width: 200,
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
