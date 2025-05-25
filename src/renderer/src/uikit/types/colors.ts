export type ColorName =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "orange"
  | "pink"
  | "sky"
  | "lime"
  | "amber"
  | "emerald"
  | "fuchsia"
  | "rose"
  | "cyan"
  | "teal"
  | "violet"
  | "neutral"
  | "indigo";

export const COLOR_MAP: Record<ColorName, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-500", text: "text-amber-500" },
  blue: { bg: "bg-primary-500", text: "text-primary-500" },
  cyan: { bg: "bg-cyan-500", text: "text-cyan-500" },
  emerald: { bg: "bg-emerald-500", text: "text-emerald-500" },
  fuchsia: { bg: "bg-fuchsia-500", text: "text-fuchsia-500" },
  green: { bg: "bg-green-500", text: "text-green-500" },
  indigo: { bg: "bg-indigo-500", text: "text-indigo-500" },
  lime: { bg: "bg-lime-500", text: "text-lime-500" },
  orange: { bg: "bg-orange-500", text: "text-orange-500" },
  pink: { bg: "bg-pink-500", text: "text-pink-500" },
  purple: { bg: "bg-purple-500", text: "text-purple-500" },
  red: { bg: "bg-red-500", text: "text-red-500" },
  rose: { bg: "bg-rose-500", text: "text-rose-500" },
  sky: { bg: "bg-sky-500", text: "text-sky-500" },
  teal: { bg: "bg-teal-500", text: "text-teal-500" },
  violet: { bg: "bg-violet-500", text: "text-violet-500" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-500" },
  neutral: { bg: "bg-neutral-500", text: "text-neutral-500" },
};
