import { useEffect } from "react";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

import Button from "@/components/system/Button/Button";
import InputText from "@/components/system/Input/InputText";

const Home = () => {
  useEffect(() => {
    setTitlebarTitle("Home");
  }, []);

  return (
    <div className="flex flex-col p-5 gap-2">
      <div>
        <Button variant="primary">Primary</Button>
      </div>
      <div>
        <Button size="large" variant="default">
          Default
        </Button>
      </div>
      <div className="w-50">
        <InputText
          placeholder="Search"
          size="large"
          isClearable
          isRounded
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
      <div className="w-50">
        <InputText
          placeholder="Enter your name"
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
      <div className="w-100 h-200"></div>
    </div>
  );
};

export default Home;
