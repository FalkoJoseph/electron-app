import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { X } from "lucide-react";

import { CustomCaret } from "./CustomCaret";

interface InputTextProps {
  className?: string;
  iconPrefix?: React.ReactNode;
  isAutosize?: boolean;
  isClearable?: boolean;
  isMultiline?: boolean;
  isRounded?: boolean;
  minHeight?: number;
  placeholder: string;
  size?: "small" | "large";
  variant?: "default" | "sidebar" | "search";
  onChange?: (value: string) => void;
}

const InputText = ({
  className,
  iconPrefix,
  isAutosize = true,
  isClearable,
  isMultiline,
  isRounded,
  minHeight = 50,
  placeholder,
  size = "small",
  variant = "default",
  onChange,
  ...props
}: InputTextProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onChange?.("");
  };

  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textareaRef.current && isAutosize) {
        textareaRef.current.style.height = `${minHeight}px`;
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    };

    adjustTextareaHeight();
  }, [value, isAutosize, minHeight]);

  const inputStyle = clsx([
    "w-full",
    !isMultiline ? "caret-transparent" : "caret-primary-500 resize-none",
    className,
    isRounded && "rounded-md",
    variant === "sidebar" && [
      "bg-black/8 border-[0.5px] p-1 border-black/8 focus:border-black/20 dark:border-transparent dark:bg-white/8 dark:shadow-x-y-inset focus:outline-none dark:text-white focus:ring-3 focus:ring-primary-500/50 dark:focus:ring-white/20",
    ],
    variant === "search" && [
      "bg-white border-[0.5px] p-1 border-black/15 dark:border-white/10 dark:bg-white/2 dark:focus:bg-white/5 focus:bg-black/5 focus:border-primary-500/70 dark:border-transparent focus:outline-none focus:ring-3 focus:ring-primary-500/50",
    ],
    variant === "default" && [
      "bg-white text-black shadow-border-dark focus:outline-none dark:bg-white/8 focus:ring-3 focus:ring-primary-500/50 dark:shadow-x-y-inset dark:text-white",
      size === "large" && "px-3 py-[7px]",
      size === "small" && "px-1 py-[1px]",
    ],
    iconPrefix &&
      (variant === "sidebar" || variant === "search" || size === "large") &&
      "pl-7",
    iconPrefix && size === "small" && "pl-6",
    isClearable && "pr-7.5",
  ]);

  return (
    <div className="relative w-full">
      {iconPrefix && (
        <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60 pointer-events-none">
          {iconPrefix}
        </div>
      )}
      {isMultiline ? (
        <textarea
          {...props}
          ref={textareaRef}
          className={inputStyle}
          placeholder={placeholder}
          style={{ minHeight: "1.5rem" }}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <>
          <input
            {...props}
            ref={inputRef}
            className={inputStyle}
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
          />
          <CustomCaret inputRef={inputRef} />
        </>
      )}
      {isClearable && (
        <div
          className={clsx(
            "absolute right-2 transition-[scale,opacity] ease-in-out duration-200  rounded-full size-3.5 flex items-center justify-center",
            "bg-black/50 dark:bg-white/50 active:bg-black/20 dark:active:bg-white/20 text-white dark:text-black",
            value
              ? "scale-100 opacity-100"
              : "scale-80 opacity-0 pointer-events-none",
            isMultiline ? "top-2" : " top-1/2 -translate-y-1/2",
          )}
          onClick={handleClear}
        >
          <X size={12} />
        </div>
      )}
    </div>
  );
};

export { InputText };
