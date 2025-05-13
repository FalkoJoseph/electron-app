import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "small" | "large" | "icon";
  variant?: "default" | "primary" | "transparent";
}

const Button = ({
  children,
  size = "small",
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <button className={clsx("btn", `btn-${variant}`, `btn-${size}`)} {...props}>
      {children}
    </button>
  );
};

export default Button;
