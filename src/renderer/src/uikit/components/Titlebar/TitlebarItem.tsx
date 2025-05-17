import clsx from "clsx";

interface TitlebarItemProps {
  align: "left" | "right";
  children: React.ReactNode;
}

const TitlebarItem = ({ align = "left", children }: TitlebarItemProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center gap-2 no-drag",
        align === "left" && "justify-start",
        align === "right" && "justify-end",
      )}
    >
      {children}
    </div>
  );
};

export { TitlebarItem };
