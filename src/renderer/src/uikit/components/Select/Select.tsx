import clsx from "clsx";
import { ChevronsUpDown } from "lucide-react";

import { type ColorName } from "@/uikit";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  color?: ColorName;
  variant?: "default" | "accent";
  width?: "full" | "auto";
}

const Select = ({
  children,
  color,
  variant = "accent",
  width = "auto",
  ...props
}: SelectProps) => {
  return (
    <div
      className={clsx(
        "group relative inline-block",
        width === "full" && "w-full",
      )}
    >
      <select
        className={clsx(
          "w-full btn appearance-none min-w-12 pl-2.5! pr-6.5!",
          variant === "default" && "hover:btn-default",
          variant === "accent" && "btn-default",
        )}
        {...props}
      >
        {children}
      </select>
      <div className="absolute right-0 top-0 pointer-events-none m-[3px]">
        <div
          className={clsx(
            "size-[15px] rounded",
            variant === "default" &&
              "bg-neutral-200 border-[0.5px] border-black/10 dark:border-transparent dark:bg-white/10 group-hover:bg-transparent group-hover:border-transparent",
            variant === "accent" &&
              "bg-gradient-to-t  text-white dark:shadow-inset",
            variant === "accent" && !color && "btn-primary",
            variant === "accent" && color && `btn-${color}`,
          )}
        >
          <div
            className={clsx(
              "relative",
              variant === "default" && "left-[0.5px] top-[0.5px]",
              variant === "accent" && "left-[0.8px] top-[1px]",
            )}
          >
            <ChevronsUpDown size={13} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Select };
