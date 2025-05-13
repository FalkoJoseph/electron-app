import { create } from "zustand";

interface State {
  color: string;
}

const initialState: State = {
  color: "yellow",
};

const useColorStore = create<State>(() => ({
  ...initialState,
}));

export function setColorStore(color: string) {
  useColorStore.setState({ color });
}

export default useColorStore;
