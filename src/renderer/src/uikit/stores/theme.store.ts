import { create } from "zustand";

import { type ColorName } from "@/uikit/types";

interface ThemeState {
  activeColor: ColorName;
}

const initialState: ThemeState = {
  activeColor: "blue",
};

const useThemeStore = create<ThemeState>(() => ({
  ...initialState,
}));

export const setActiveColor = (color: ColorName) => {
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
  useThemeStore.setState({ activeColor: effectiveColor });
};

export { useThemeStore };
