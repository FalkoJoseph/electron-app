"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { ColorName, cn } from "@/uikit";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    color?: ColorName;
    label?: string | React.ReactNode;
  }
>(({ className, color, label, id: propId, ...props }, ref) => {
  const generatedId = React.useId();
  const id = propId || generatedId;

  return (
    <div className="flex items-start">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer h-4 w-4 focus:outline-none shadow-x-y-inset-invert dark:bg-gradient-to-t bg-neutral-50 active:bg-neutral-200 dark:shadow-inset-soft text-white dark:active:opacity-80 dark:gradient-gray-invert shrink-0 rounded-sm disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:shadow-none dark:data-[state=checked]:shadow-inset-soft data-[state=checked]:active:opacity-100 data-[state=checked]:bg-white data-[state=checked]:bg-gradient-to-t",
          color
            ? `data-[state=checked]:btn-${color}`
            : "data-[state=checked]:btn-primary",
          "data-[state=checked]:text-white",
          className,
        )}
        id={id}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label className="pl-2 -mt-0.5" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
