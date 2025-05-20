import clsx from "clsx";

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "transparent";
}

const ButtonGroup = ({
  children,
  variant = "default",
  ...props
}: ButtonGroupProps) => {
  const buttonGroupStyles = clsx(
    "inline-flex items-center transition duration-300 rounded-md",
    variant === "transparent"
      ? "hover:bg-black/5 dark:hover:bg-white/10"
      : "[&>.btn]:rounded-none [&>.btn]:first:rounded-l-md [&>.btn]:last:rounded-r-md",
  );

  return (
    <div className={buttonGroupStyles} {...props}>
      {children}
    </div>
  );
};

export { ButtonGroup };
