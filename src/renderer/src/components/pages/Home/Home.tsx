import { useEffect } from "react";

import useTitlebarStore, {
  setTitlebarActionsLeft,
  setTitlebarBackground,
  setTitlebarBorder,
  setTitlebarSubtitle,
  setTitlebarTitle,
  setTrafficLightPosition,
} from "@/stores/titlebar.store";

import Button from "@/components/system/Button/Button";
import Window from "@/components/system/Window/Window";

const Home = () => {
  const trafficLightPosition = useTitlebarStore(
    (state) => state.trafficLightPosition,
  );

  useEffect(() => {
    setTitlebarBorder(true);
    setTitlebarBackground(true);
    setTitlebarTitle("Home");
    setTitlebarSubtitle("Welcome to my vibe browser");
    setTitlebarActionsLeft([
      <Button
        key="small"
        variant="default"
        onClick={() =>
          setTrafficLightPosition({
            x: 10,
            y: 10,
          })
        }
      >
        Small
      </Button>,
      <Button
        key="large"
        variant="transparent"
        onClick={() =>
          setTrafficLightPosition({
            x: 17,
            y: 19,
          })
        }
      >
        Large
      </Button>,
    ]);
  }, [trafficLightPosition]);

  return (
    <Window>
      <h1>my vibe browser</h1>

      <Button variant="primary">Gereed</Button>
    </Window>
  );
};

export default Home;
