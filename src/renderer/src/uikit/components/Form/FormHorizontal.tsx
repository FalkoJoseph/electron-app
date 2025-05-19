import clsx from "clsx";

interface FormHorizontalProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  align?: "center" | "start";
  isCentered?: boolean;
  isSpread?: boolean;
}

const FormHorizontal = ({
  children,
  align = "center",
  isCentered = false,
  isSpread = false,
  ...props
}: FormHorizontalProps) => {
  return (
    <div
      className={clsx(
        "flex",
        align === "center" && "items-center",
        align === "start" && "items-start",
        isSpread
          ? "justify-between gap-4"
          : isCentered
            ? "justify-center gap-5"
            : "justify-start gap-4",
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { FormHorizontal };
