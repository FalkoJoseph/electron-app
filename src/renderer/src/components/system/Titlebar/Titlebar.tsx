import { useEffect } from "react";

import clsx from "clsx";

import TitlebarItem from "./TitlebarItem";

import useTitlebarStore from "@/stores/titlebar.store";

const Titlebar = () => {
  const trafficLightPosition = useTitlebarStore(
    (state) => state.trafficLightPosition,
  );
  const hasBorder = useTitlebarStore((state) => state.hasBorder);
  const hasBackground = useTitlebarStore((state) => state.hasBackground);
  const actionsLeft = useTitlebarStore((state) => state.actionsLeft);
  const actionsRight = useTitlebarStore((state) => state.actionsRight);
  const title = useTitlebarStore((state) => state.title);
  const subtitle = useTitlebarStore((state) => state.subtitle);

  const titlebarStyle = clsx(
    [
      "titlebar z-40 drag absolute w-full z-10 flex min-h-[35px] items-center justify-between px-3 text-center text-sm text-black/80 transition-shadow duration-100",
      "dark:text-white/80 hover:shadow/5",
    ],
    hasBorder && ["border-b border-black/10", "dark:border-white/10"],
    hasBackground && [
      "border-b border-black/10 bg-white/80 backdrop-blur-lg",
      "dark:border-black dark:bg-neutral-700/80",
    ],
    subtitle ? ["py-2"] : ["py-1"],
  );

  useEffect(() => {
    if (trafficLightPosition) {
      window.api.updateTrafficLightPosition(trafficLightPosition);
    }
  }, [trafficLightPosition]);

  return (
    <div className={titlebarStyle}>
      <div className="w-1/3 pl-18">
        {actionsLeft &&
          actionsLeft.map((action, index) => (
            <TitlebarItem key={index} align="left">
              {action}
            </TitlebarItem>
          ))}
      </div>

      <div className="w-1/3">
        {title && <p>{title}</p>}
        {subtitle && <p className="text-xxs opacity-70">{subtitle}</p>}
      </div>

      <div className="w-1/3">
        <TitlebarItem align="right">
          {actionsRight &&
            actionsRight.map((action, index) => (
              <TitlebarItem key={index} align="right">
                {action}
              </TitlebarItem>
            ))}
        </TitlebarItem>
      </div>
    </div>
  );
};

export default Titlebar;
