import { create } from "zustand";

type ColorName =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "orange"
  | "sky"
  | "pink"
  | "lime"
  | "amber"
  | "emerald"
  | "fuchsia"
  | "rose"
  | "cyan"
  | "teal"
  | "violet"
  | "indigo";

interface ThemeState {
  primaryColor: ColorName;
}

const initialState: ThemeState = {
  primaryColor: "blue",
};

const useThemeStore = create<ThemeState>(() => ({
  ...initialState,
}));

export const setPrimaryColor = (color: ColorName) => {
  // Use blue as default if color is empty
  const effectiveColor = color || "blue";

  document.documentElement.style.setProperty(
    "--color-primary-400",
    `var(--color-${effectiveColor}-400)`,
  );
  document.documentElement.style.setProperty(
    "--color-primary-500",
    `var(--color-${effectiveColor}-500)`,
  );
  document.documentElement.style.setProperty(
    "--color-primary-600",
    `var(--color-${effectiveColor}-600)`,
  );

  // Update store state
  useThemeStore.setState({ primaryColor: effectiveColor });
};

export default useThemeStore;
