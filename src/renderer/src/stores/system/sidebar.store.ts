import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  isOpenLeft: boolean;
  isOpenRight: boolean;
  isResizing: boolean;
  maxWidth: number;
  minWidth: number;
  widthLeft: number;
  widthRight: number;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  isOpenLeft: false,
  isOpenRight: false,
  isResizing: false,
  maxWidth: 500,
  minWidth: 180,
  widthLeft: 200,
  widthRight: 200,
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

export const setSidebarWidthLeft = (widthLeft: number) => {
  useSidebarStore.setState({ widthLeft });
};

export const setSidebarWidthRight = (widthRight: number) => {
  useSidebarStore.setState({ widthRight });
};

export const setSidebarResizing = (isResizing: boolean) => {
  useSidebarStore.setState({ isResizing });
};

export default useSidebarStore;
