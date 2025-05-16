"use client";

import * as React from "react";

import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "data-[state=unchecked]:shadow-inner data-[state=checked]:shadow-inner-border peer bg-gradient-to-t inline-flex h-5 w-9 shrink-0 items-center focus:outline-none rounded-full disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600 data-[state=unchecked]:from-neutral-200 data-[state=unchecked]:to-neutral-200",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0.5",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
