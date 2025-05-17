"use client";

import * as React from "react";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

import { ColorName } from "@/types/colors";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  color?: ColorName;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, color, ...props }, ref) => {
  const style = color
    ? ({
        "--switch-color-from": `var(--color-${color}-500)`,
        "--switch-color-to": `var(--color-${color}-600)`,
      } as React.CSSProperties)
    : undefined;

  return (
    <SwitchPrimitives.Root
      className={cn(
        "dark:data-[state=unchecked]:shadow-inner-border data-[state=unchecked]:shadow-inner data-[state=checked]:shadow-inner-border peer bg-gradient-to-t inline-flex h-5 w-9 shrink-0 items-center focus:outline-none rounded-full disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=unchecked]:from-neutral-200 data-[state=unchecked]:to-neutral-200 dark:data-[state=unchecked]:from-white/10 dark:data-[state=unchecked]:to-white/10",
        color
          ? "data-[state=checked]:from-[var(--switch-color-from)] data-[state=checked]:to-[var(--switch-color-to)]"
          : "data-[state=checked]:from-primary-500 data-[state=checked]:to-primary-600",
        className,
      )}
      style={style}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0.5",
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
