import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  height: number;
  subtitle: string | null;
  title: string | null;
  trafficLightPosition: { x: number; y: number } | null;
  visible: boolean;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  height: 0,
  subtitle: null,
  title: null,
  trafficLightPosition: null,
  visible: false,
};

const useTitlebarStore = create<State>(() => ({
  ...initialState,
}));

export const setTitlebarVisible = (visible: boolean) => {
  useTitlebarStore.setState({ visible });
};

export const setTrafficLightPosition = (position: { x: number; y: number }) => {
  useTitlebarStore.setState({ trafficLightPosition: position });
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

export const setTitlebarHeight = (height: number) => {
  useTitlebarStore.setState({ height });
};

export default useTitlebarStore;
