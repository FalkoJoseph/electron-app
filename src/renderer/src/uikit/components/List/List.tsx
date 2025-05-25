import { useNavigate } from "react-router";

import clsx from "clsx";
import { ChevronRight } from "lucide-react";

import { type ColorName } from "@/uikit/types";

interface ListProps {
  children: React.ReactNode;
}

interface ListItemProps {
  icon?: React.ReactNode;
  iconColor?: ColorName;
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  rightLabel?: string | React.ReactNode;
  path?: string;
  actions?: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return <div>{children}</div>;
};

const ListItem = ({
  icon,
  iconColor = "neutral",
  label,
  subLabel,
  rightLabel,
  path,
  actions,
}: ListItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "list relative group/list-item flex p-2 items-start justify-between gap-4",
        path && "active:bg-black/3 dark:active:bg-white/3",
      )}
      onClick={() => {
        if (path) {
          navigate(path);
        }
      }}
    >
      <div className="absolute h-px w-[calc(100%-1rem)] bottom-0 bg-black/6 group-last/list-item:hidden dark:bg-white/6" />

      <div className="flex items-start gap-3">
        {icon && (
          <div
            className={clsx(
              "shrink-0 bg-gradient-to-t text-white rounded-md flex items-center justify-center size-6 [&>svg]:size-3.5 shadow [&>svg]:drop-shadow-xs/20",
              iconColor && `btn-${iconColor}`,
            )}
          >
            {icon}
          </div>
        )}

        <div>
          {label && <div className={clsx(path && "mt-[2px]")}>{label}</div>}
          {subLabel && (
            <div className="text-xs text-black/50 dark:text-white/50">
              {subLabel}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        {actions && !path && actions}

        {path && (
          <div className="mt-0.5 flex items-center gap-2">
            {rightLabel && (
              <div className="text-black/50 dark:text-white/50">
                {rightLabel}
              </div>
            )}

            {path && (
              <ChevronRight
                className="text-black/30 dark:text-white/30"
                size={18}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { List, ListItem };
