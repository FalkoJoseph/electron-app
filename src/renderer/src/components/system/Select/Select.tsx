import { RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
import clsx from "clsx";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  variant?: "default" | "primary";
  width?: "full" | "auto";
}

const Select = ({
  children,
  variant = "primary",
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
          variant === "primary" && "btn-default",
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
            variant === "primary" &&
              "bg-gradient-to-t from-blue-600 to-blue-500 text-white dark:shadow-inset",
          )}
        >
          <div
            className={clsx(
              "relative -top-[2px]",
              variant === "default" && "left-[0.5px]",
              variant === "primary" && "left-[0.8px]",
            )}
          >
            <RiArrowUpSLine className="-mb-2" size={13.2} />
            <RiArrowDownSLine size={13.2} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
