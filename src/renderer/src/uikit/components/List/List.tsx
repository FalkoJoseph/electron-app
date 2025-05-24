import { ChevronRight } from "lucide-react";

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  icon?: React.ReactNode;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return <div>{children}</div>;
};

const ListItem = ({ icon, label, subLabel }: ListItemProps) => {
  return (
    <div className="flex hover:bg-white/10 py-2 items-center justify-between -m-1 gap-4 border-b border-black/10 last:border-b-0 dark:border-white/10">
      <div className="flex items-center gap-3">
        {icon}

        <div>
          <div>{label}</div>
          <div className="text-xs text-black/50 dark:text-white/50">
            {subLabel}
          </div>
        </div>
      </div>

      <div>
        <ChevronRight className="text-black/30 dark:text-white/30" size={18} />
      </div>
    </div>
  );
};

export { List, ListItem };
