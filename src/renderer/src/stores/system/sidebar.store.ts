import { create } from "zustand";

interface Search {
  placeholder: string | null;
  position?: "left" | "right";
  handleChange: (value: string) => void;
}

interface State {
  actionsLeft: [React.ReactNode, React.ReactNode?] | null;
  actionsRight: [React.ReactNode, React.ReactNode?] | null;
  contentLeft: React.ReactNode | null;
  contentRight: React.ReactNode | null;
  hasLeft: boolean;
  hasRight: boolean;
  hasSearchLeft: boolean;
  hasSearchRight: boolean;
  isOpenLeft: boolean;
  isOpenRight: boolean;
  isResizing: boolean;
  maxWidth: number;
  minWidth: number;
  search: Search;
  widthLeft: number;
  widthRight: number;
}

const initialState: State = {
  actionsLeft: null,
  actionsRight: null,
  contentLeft: null,
  contentRight: null,
  hasLeft: false,
  hasRight: false,
  hasSearchLeft: false,
  hasSearchRight: false,
  isOpenLeft: false,
  isOpenRight: false,
  isResizing: false,
  maxWidth: 280,
  minWidth: 180,
  search: {
    handleChange: () => {},
    placeholder: "",
  },
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

export const setSidebarContentLeft = (contentLeft: React.ReactNode) => {
  useSidebarStore.setState({ contentLeft });
};

export const setSidebarContentRight = (contentRight: React.ReactNode) => {
  useSidebarStore.setState({ contentRight });
};

export const setSidebarActionsLeft = (actionsLeft: React.ReactNode[]) => {
  const limitedActions = actionsLeft.slice(0, 2) as [
    React.ReactNode,
    React.ReactNode?,
  ];
  useSidebarStore.setState({
    actionsLeft: limitedActions.length > 0 ? limitedActions : null,
  });
};

export const setSidebarActionsRight = (actionsRight: React.ReactNode[]) => {
  const limitedActions = actionsRight.slice(0, 2) as [
    React.ReactNode,
    React.ReactNode?,
  ];
  useSidebarStore.setState({
    actionsRight: limitedActions.length > 0 ? limitedActions : null,
  });
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

export const setSidebarSearch = (search: Search) => {
  const position = search.position ?? "left";
  if (position === "left") {
    useSidebarStore.setState({
      hasSearchLeft: true,
      search: { ...search, position },
    });
  } else {
    useSidebarStore.setState({
      hasSearchRight: true,
      search: { ...search, position },
    });
  }
};

export default useSidebarStore;
