import clsx from "clsx";

interface FormHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  align?: "center" | "start";
  isSpread?: boolean;
}

const FormHorizontal = ({
  children,
  align = "center",
  isSpread = false,
  ...props
}: FormHorizontalProps) => {
  return (
    <div
      className={clsx(
        "flex",
        align === "center" && "items-center",
        align === "start" && "items-start",
        isSpread ? "justify-between gap-4" : "justify-start gap-2",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { FormHorizontal };
