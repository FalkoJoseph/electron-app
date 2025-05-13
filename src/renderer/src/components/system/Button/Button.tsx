import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "transparent";
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  return (
    <button className={clsx("btn", `btn-${variant}`)} {...props}>
      {children}
    </button>
  );
};

export default Button;
