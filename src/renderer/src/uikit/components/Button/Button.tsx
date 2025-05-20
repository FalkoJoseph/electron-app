import clsx from "clsx";

import { type ColorName } from "@/uikit/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: ColorName;
  size?: "small" | "large" | "icon";
  variant?:
    | "default"
    | "accent"
    | "transparent"
    | "transparent-active"
    | "transparent-default";
}

const Button = ({
  children,
  color,
  size = "small",
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        "btn group/button",
        `btn-${variant}`,
        `btn-${size}`,
        color && `btn-${color}`,
        variant === "accent" && !color && "btn-primary",
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
