import { useState } from "react";

import { RiCloseLine } from "@remixicon/react";
import clsx from "clsx";

interface InputTextProps {
  iconPrefix?: React.ReactNode;
  isClearable?: boolean;
  isRounded?: boolean;
  placeholder: string;
  size?: "small" | "large";
  variant?: "default" | "sidebar";
  onChange?: (value: string) => void;
}

const InputText = ({
  iconPrefix,
  isClearable,
  isRounded,
  placeholder,
  size = "small",
  variant = "default",
  onChange,
}: InputTextProps) => {
  const [value, setValue] = useState("");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
  };

  const isNative = variant === "default" || variant === "sidebar";

  const inputStyle = clsx([
    "w-full",
    isNative && "text-system",
    isRounded && "rounded-md",
    variant === "sidebar" && [
      "bg-black/8 border-[0.5px] p-1 border-black/8 focus:border-black/20 dark:border-transparent dark:bg-white/8 dark:shadow-x-y-inset focus:outline-none focus:ring-3 focus:ring-blue-500/50 dark:focus:ring-white/20",
    ],
    variant === "default" && [
      "bg-white text-black shadow-border-dark focus:outline-none dark:bg-white/8 focus:ring-3 focus:ring-blue-500/50 dark:shadow-x-y-inset dark:text-white",
      size === "large" && "px-3 py-[7px]",
      size === "small" && "px-1 py-[1px]",
    ],
    iconPrefix && "pl-7",
    isClearable && "pr-8",
  ]);

  return (
    <div className="relative">
      {iconPrefix && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-system opacity-50 pointer-events-none">
          {iconPrefix}
        </div>
      )}
      <input
        className={inputStyle}
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      {isClearable && (
        <div
          className={clsx(
            "absolute right-2 top-1/2 -translate-y-1/2 duration-150  rounded-full size-3.5 flex items-center justify-center",
            "transition-all ease-in-out",
            value
              ? "scale-100 opacity-100"
              : "scale-80 opacity-0 pointer-events-none",
            variant === "sidebar" && [
              "bg-black/50 dark:bg-white/50 active:bg-black/20 dark:active:bg-white/20 text-white dark:text-black",
            ],
          )}
          onClick={handleClear}
        >
          <RiCloseLine size={12} />
        </div>
      )}
    </div>
  );
};

export default InputText;
