"use client";

import * as React from "react";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { type ColorName } from "@/uikit/types";

import { cn } from "@/uikit";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
    isHorizontal?: boolean;
  }
>(({ className, isHorizontal, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(
        "grid gap-3",
        isHorizontal && "flex flex-row gap-3",
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    color?: ColorName;
    label?: string | React.ReactNode;
  }
>(({ className, color, label, ...props }, ref) => {
  const generatedId = React.useId();
  const id = props.value || generatedId;

  return (
    <div className="flex items-start">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square size-4 shadow-x-y-inset-invert dark:bg-gradient-to-t bg-neutral-50 active:bg-neutral-200 dark:shadow-inset-soft text-white dark:active:opacity-80 dark:gradient-gray-invert data-[state=checked]:shadow-none dark:data-[state=checked]:shadow-inset-soft data-[state=checked]:active:opacity-100 data-[state=checked]:bg-white data-[state=checked]:bg-gradient-to-t rounded-full focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          color
            ? `data-[state=checked]:btn-${color}`
            : "data-[state=checked]:btn-primary",
          className,
        )}
        id={id}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-2 fill-white stroke-0" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {label && (
        <label className="pl-2 -mt-0.5" htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
