import { useEffect } from "react";

import useTitlebarStore from "@/stores/system/titlebar.store";

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
