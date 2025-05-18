import { useEffect } from "react";

import { useTitlebarStore } from "@/uikit/stores";

export const useTrafficLight = () => {
  const trafficLightPosition = useTitlebarStore(
    (state) => state.trafficLightPosition,
  );

  useEffect(() => {
    if (trafficLightPosition) {
      window.api.updateTrafficLightPosition(trafficLightPosition);
    }
  }, [trafficLightPosition]);

  return trafficLightPosition;
};
