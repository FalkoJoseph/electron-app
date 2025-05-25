import clsx from "clsx";

interface PanelProps {
  children: React.ReactNode;
}

interface PanelFooterProps {
  children: React.ReactNode;
  isInline?: boolean;
}

const Panel = ({ children }: PanelProps) => {
  return (
    <div className="panel overflow-hidden rounded-md bg-black/2 p-2 border border-black/5 dark:bg-white/2 dark:border-white/10 [&:has(.list)]:p-0">
      {children}
    </div>
  );
};

const PanelFooter = ({ children, isInline }: PanelFooterProps) => {
  return (
    <div
      className={clsx(
        "flex justify-end gap-2",
        !isInline && "pt-3",
        isInline &&
          "pt-2 border-t border-black/6 dark:border-white/6 mx-2 mb-2",
      )}
    >
      {children}
    </div>
  );
};

export { Panel, PanelFooter };
