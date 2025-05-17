import { useState } from "react";
import { Link, useLocation } from "react-router";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { COLOR_MAP, ColorName } from "@/uikit/types/colors";

interface NavigationItem {
  icon: React.ReactNode | null;
  label: string;
  path: string;
}

interface NavigationGroup {
  activeColor: ColorName | "default";
  dragAndDrop?: {
    enableGroupDrag?: boolean;
    enableItemDrag?: boolean;
  };
  items: NavigationItem[];
  label?: string;
}

interface NavigationProps {
  contents: NavigationGroup[];
}

interface SortableNavigationItemProps {
  activeColor: NavigationGroup["activeColor"];
  group: NavigationGroup;
  item: NavigationItem;
}

const SortableNavigationItem = ({
  activeColor,
  group,
  item,
}: SortableNavigationItemProps) => {
  const location = useLocation();
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    disabled: !group.dragAndDrop?.enableItemDrag,
    id: item.path,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActive =
    !isDragging &&
    (location.pathname === item.path || location.pathname === `/${item.path}`);

  const navigationItemStyle = clsx(
    "flex items-center rounded-md gap-1.5 px-2 py-[0.35rem] focus:outline-none",
    isActive && [
      activeColor === "default"
        ? "bg-black/10 dark:bg-white/10"
        : COLOR_MAP[activeColor].bg + " text-white",
    ],
    isDragging && "opacity-0",
  );

  return (
    <Link
      ref={setNodeRef}
      className={navigationItemStyle}
      style={style}
      to={item.path}
      {...(group.dragAndDrop?.enableItemDrag
        ? { ...attributes, ...listeners }
        : {})}
    >
      <div
        className={clsx(
          "[&>svg]:size-4",
          isActive && activeColor !== "default"
            ? "[&>svg]:text-white"
            : activeColor === "default"
              ? "[&>svg]:text-primary-500"
              : COLOR_MAP[activeColor].text,
        )}
      >
        {item.icon}
      </div>

      {item.label}
    </Link>
  );
};

interface SortableNavigationGroupProps {
  group: NavigationGroup;
  groupIndex: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const SortableNavigationGroup = ({
  group,
  groupIndex,
  isExpanded,
  onToggle,
}: SortableNavigationGroupProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      disabled: !group.dragAndDrop?.enableGroupDrag,
      id: `group-${groupIndex}`,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className={clsx("flex flex-col gap-0.5 no-drag")}
      style={style}
    >
      {group.label && (
        <button
          className="group flex items-center justify-between gap-4 px-5 text-xxs font-semibold text-black/30 dark:text-white/40 focus:outline-none"
          onClick={onToggle}
          {...(group.dragAndDrop?.enableGroupDrag
            ? { ...attributes, ...listeners }
            : {})}
        >
          {group.label}

          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            className="text-black group-hover:opacity-30 opacity-0 transition-opacity duration-100 group-active:opacity-60 dark:text-white"
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="size-5" />
          </motion.div>
        </button>
      )}

      <motion.div
        animate={{ height: isExpanded ? "auto" : 0 }}
        className={clsx("overflow-hidden px-3")}
        initial={false}
        transition={{ duration: 0.1 }}
      >
        <div className="flex flex-col gap-1">
          <SortableContext
            items={group.items.map((item) => item.path)}
            strategy={verticalListSortingStrategy}
          >
            {group.items.map((item) => (
              <SortableNavigationItem
                key={item.path}
                activeColor={group.activeColor}
                group={group}
                item={item}
              />
            ))}
          </SortableContext>
        </div>
      </motion.div>
    </div>
  );
};

const Navigation = ({ contents }: NavigationProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>(
    Object.fromEntries(contents.map((_, index) => [index, true])),
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState(contents);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      if (active.id.toString().startsWith("group-")) {
        // Handle group reordering
        const oldIndex = items.findIndex(
          (_, index) => `group-${index}` === active.id,
        );
        const newIndex = items.findIndex(
          (_, index) => `group-${index}` === over.id,
        );
        setItems((items) => arrayMove(items, oldIndex, newIndex));
      } else {
        // Handle item reordering within groups
        const activeGroupIndex = items.findIndex((group) =>
          group.items.some((item) => item.path === active.id),
        );
        const overGroupIndex = items.findIndex((group) =>
          group.items.some((item) => item.path === over.id),
        );

        if (activeGroupIndex === overGroupIndex) {
          const group = items[activeGroupIndex];
          const oldIndex = group.items.findIndex(
            (item) => item.path === active.id,
          );
          const newIndex = group.items.findIndex(
            (item) => item.path === over.id,
          );

          setItems((items) => {
            const newItems = [...items];
            newItems[activeGroupIndex] = {
              ...group,
              items: arrayMove(group.items, oldIndex, newIndex),
            };
            return newItems;
          });
        }
      }
    }

    setActiveId(null);
  };

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupIndex]: !prev[groupIndex],
    }));
  };

  const activeGroup = activeId?.toString().startsWith("group-")
    ? items[parseInt(activeId.split("-")[1])]
    : null;

  const activeItem =
    activeId && !activeId.toString().startsWith("group-")
      ? items
          .flatMap((group) => group.items)
          .find((item) => item.path === activeId)
      : null;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <nav className="flex flex-col gap-4">
        <SortableContext
          items={items.map((_, index) => `group-${index}`)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((group, groupIndex) => (
            <SortableNavigationGroup
              key={`group-${groupIndex}`}
              group={group}
              groupIndex={groupIndex}
              isExpanded={expandedGroups[groupIndex]}
              onToggle={() => toggleGroup(groupIndex)}
            />
          ))}
        </SortableContext>
      </nav>

      <DragOverlay>
        {activeId ? (
          activeGroup ? (
            <div className="pl-5 text-xxs font-semibold text-black/30 dark:text-white/40">
              {activeGroup.label}
            </div>
          ) : activeItem ? (
            <div className="p-2">
              <div className="flex items-center gap-1.5">
                <div className="[&>svg]:size-4 [&>svg]:text-primary-500">
                  {activeItem.icon}
                </div>

                {activeItem.label}
              </div>
            </div>
          ) : null
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export { Navigation };
