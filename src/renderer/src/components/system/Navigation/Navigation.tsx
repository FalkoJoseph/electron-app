import { useState } from "react";
import { Link, useLocation } from "react-router";

import { RiArrowRightSLine } from "@remixicon/react";
import clsx from "clsx";
import { motion } from "motion/react";

export type ColorName =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "yellow"
  | "orange"
  | "pink"
  | "lime"
  | "amber"
  | "emerald"
  | "fuchsia"
  | "rose"
  | "cyan"
  | "teal"
  | "violet"
  | "indigo"
  | "black";

const COLOR_MAP: Record<ColorName, { bg: string; text: string }> = {
  amber: { bg: "bg-amber-500", text: "text-amber-500" },
  black: { bg: "bg-black", text: "text-black" },
  blue: { bg: "bg-blue-500", text: "text-blue-500" },
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
  teal: { bg: "bg-teal-500", text: "text-teal-500" },
  violet: { bg: "bg-violet-500", text: "text-violet-500" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-500" },
};

interface NavigationItem {
  icon: React.ReactNode | null;
  label: string;
  path: string;
}

interface NavigationGroup {
  activeColor: ColorName | "default";
  items: NavigationItem[];
  label: string;
}

interface NavigationProps {
  contents: NavigationGroup[];
}

const Navigation = ({ contents }: NavigationProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>(
    Object.fromEntries(contents.map((_, index) => [index, true])),
  );
  const location = useLocation();

  const navigationItemStyle = (
    path: string,
    activeColor: NavigationGroup["activeColor"],
  ) =>
    clsx(
      "flex items-center rounded-md gap-1.5 px-2 py-[0.35rem] text-system",
      (location.pathname === path || location.pathname === `/${path}`) && [
        activeColor === "default"
          ? "bg-black/10 dark:bg-white/10"
          : COLOR_MAP[activeColor].bg + " text-white",
      ],
    );

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupIndex]: !prev[groupIndex],
    }));
  };

  return (
    <nav className="flex flex-col gap-4">
      {contents.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-0.5 no-drag">
          <button
            className="group flex items-center justify-between gap-4 px-4 text-xxs font-semibold text-black/30 dark:text-white/40"
            onClick={() => toggleGroup(groupIndex)}
          >
            {group.label}

            <motion.div
              animate={{ rotate: expandedGroups[groupIndex] ? 90 : 0 }}
              className="text-black group-hover:opacity-30 opacity-0 transition-opacity duration-100 group-active:opacity-60"
              transition={{ duration: 0.2 }}
            >
              <RiArrowRightSLine className="size-5" />
            </motion.div>
          </button>

          <motion.div
            animate={{ height: expandedGroups[groupIndex] ? "auto" : 0 }}
            className={clsx("overflow-hidden px-3")}
            initial={false}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col gap-1">
              {group.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  className={navigationItemStyle(item.path, group.activeColor)}
                  to={item.path}
                >
                  <div
                    className={clsx(
                      "[&>svg]:size-4",
                      (location.pathname === item.path ||
                        location.pathname === `/${item.path}`) &&
                        group.activeColor !== "default"
                        ? "[&>svg]:text-white"
                        : group.activeColor === "default"
                          ? "[&>svg]:text-blue-500"
                          : COLOR_MAP[group.activeColor].text,
                    )}
                  >
                    {item.icon}
                  </div>
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
