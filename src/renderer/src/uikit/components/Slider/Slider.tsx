import * as React from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/uikit";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  hasMarks?: boolean;
  markLabels?: string[];
};

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, hasMarks = false, markLabels, ...props }, ref) => {
  const space = props.max && props.step ? props?.max / props.step : 0;

  return (
    <div className="grid gap-6">
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center disabled:opacity-50",
          markLabels ? "min-h-6.5" : "min-h-4",
          className,
        )}
        onValueChange={props.onValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-[4px] w-full grow overflow-hidden rounded-full bg-black/5 dark:bg-white/5 shadow-border-inner dark:shadow-none">
          {!hasMarks && (
            <SliderPrimitive.Range className="absolute h-full bg-primary-500" />
          )}
        </SliderPrimitive.Track>

        {hasMarks && (
          <div className="absolute inset-0 flex grow w-full items-center justify-between">
            {Array.from({ length: space + 1 }).map((_, index) => (
              <div key={index} className="relative">
                <div className="w-0.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                {markLabels && markLabels[index] && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-4 text-xxs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                    {markLabels[index]}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <SliderPrimitive.Thumb
          className={cn(
            "block bg-white h-4 active:bg-neutral-100 dark:bg-neutral-400 dark:active:bg-neutral-300 shadow-border focus:outline-none disabled:pointer-events-none",
            !hasMarks ? "w-4 rounded-full" : "w-2 rounded-md",
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
});

export { Slider };
