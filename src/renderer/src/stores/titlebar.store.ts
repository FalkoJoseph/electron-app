import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  hasBackground: boolean;
  hasBorder: boolean;
  subtitle: string | null;
  title: string | null;
  trafficLightPosition: { x: number; y: number } | null;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  hasBackground: false,
  hasBorder: false,
  subtitle: null,
  title: null,
  trafficLightPosition: null,
};

const useTitlebarStore = create<State>(() => ({
  ...initialState,
}));

export const setTrafficLightPosition = (position: { x: number; y: number }) => {
  useTitlebarStore.setState({ trafficLightPosition: position });
};

export const setTitlebarBorder = (hasBorder: boolean) => {
  useTitlebarStore.setState({ hasBorder });
};

export const setTitlebarBackground = (hasBackground: boolean) => {
  useTitlebarStore.setState({ hasBackground });
};

export const setTitlebarTitle = (title: string | null) => {
  useTitlebarStore.setState({ title });
};

export const setTitlebarSubtitle = (subtitle: string | null) => {
  useTitlebarStore.setState({ subtitle });
};

export const setTitlebarActionsLeft = (component: React.ReactNode) => {
  useTitlebarStore.setState({ actionsLeft: [component] });
};

export const setTitlebarActionsRight = (component: React.ReactNode) => {
  useTitlebarStore.setState({ actionsRight: [component] });
};

export default useTitlebarStore;
