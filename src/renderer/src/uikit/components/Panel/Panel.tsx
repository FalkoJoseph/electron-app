interface PanelProps {
  children: React.ReactNode;
}

const Panel = ({ children }: PanelProps) => {
  return (
    <div className="rounded-md bg-black/2 p-2 border border-black/5 dark:bg-white/2 dark:border-white/10">
      {children}
    </div>
  );
};

export { Panel };
