import { create } from "zustand";

interface State {
  actionsLeft: React.ReactNode[] | null;
  actionsRight: React.ReactNode[] | null;
  align: "left" | "center";
  borderOnScroll: boolean;
  height: number;
  size: "small" | "large";
  subtitle: string | null;
  title: React.ReactNode | null;
  trafficLightPosition: { x: number; y: number } | null;
  visible: boolean;
}

const initialState: State = {
  actionsLeft: [],
  actionsRight: [],
  align: "center",
  borderOnScroll: false,
  height: 0,
  size: "small",
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

export const setTitlebarAlign = (align: "left" | "center") => {
  useTitlebarStore.setState({ align });
};

export const setTitlebarSize = (size: "small" | "large") => {
  useTitlebarStore.setState({ size });
};

export const setTitlebarTitle = (title: React.ReactNode | null) => {
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

export const setTitlebarBorderOnScroll = (borderOnScroll: boolean) => {
  useTitlebarStore.setState({ borderOnScroll });
};

export default useTitlebarStore;
