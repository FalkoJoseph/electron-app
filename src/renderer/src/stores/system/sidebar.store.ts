import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  hasLeft: boolean;
  hasRight: boolean;
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
  hasLeft: false,
  hasRight: false,
  isOpenLeft: false,
  isOpenRight: false,
  isResizing: false,
  maxWidth: 300,
  minWidth: 180,
  widthLeft: 200,
  widthRight: 200,
};

const useSidebarStore = create<State>(() => ({
  ...initialState,
}));

export const setSidebarLeft = (hasLeft: boolean) => {
  useSidebarStore.setState({ hasLeft });
};

export const setSidebarRight = (hasRight: boolean) => {
  useSidebarStore.setState({ hasRight });
};

export const setSidebarOpenLeft = (isOpenLeft: boolean) => {
  const hasLeft = useSidebarStore.getState().hasLeft;

  if (hasLeft) {
    useSidebarStore.setState({ isOpenLeft });
  }
};

export const setSidebarOpenRight = (isOpenRight: boolean) => {
  const hasRight = useSidebarStore.getState().hasRight;

  if (hasRight) {
    useSidebarStore.setState({ isOpenRight });
  }
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
