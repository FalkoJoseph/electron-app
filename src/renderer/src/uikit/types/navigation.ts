import { type ColorName } from "@/uikit/types";

export interface NavigationItem {
  icon?: React.ReactNode | null;
  label: string | React.ReactNode;
  path: string;
}

export interface NavigationGroup {
  activeColor: ColorName | "default";
  dragAndDrop?: {
    enableGroupDrag?: boolean;
    enableItemDrag?: boolean;
  };
  items: NavigationItem[];
  label?: string;
}
