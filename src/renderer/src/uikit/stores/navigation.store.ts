import { create } from "zustand";

import { type NavigationGroup } from "@/uikit/types";

interface State {
  items: NavigationGroup[];
  expandedGroups: Record<number, boolean>;
}

const initialState: State = {
  items: [],
  expandedGroups: {},
};

const useNavigationStore = create<State>(() => ({
  ...initialState,
}));

export const setNavigationItems = (items: NavigationGroup[]) => {
  useNavigationStore.setState({
    items,
    expandedGroups: Object.fromEntries(items.map((_, index) => [index, true])),
  });
};

export const updateNavigationItems = (items: NavigationGroup[]) => {
  useNavigationStore.setState({ items });
};

export const setExpandedGroups = (expandedGroups: Record<number, boolean>) => {
  useNavigationStore.setState({ expandedGroups });
};

export { useNavigationStore };
