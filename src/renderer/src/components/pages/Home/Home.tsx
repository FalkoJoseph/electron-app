import { useEffect } from "react";

import { RiAddLine, RiCalendarLine } from "@remixicon/react";

import { setTitlebarTitle } from "@/stores/system/titlebar.store";

import Button from "@/components/system/Button/Button";
import InputText from "@/components/system/Input/InputText";

const Home = () => {
  useEffect(() => {
    setTitlebarTitle("");
  }, []);

  return (
    <div className="flex flex-col p-5 gap-2">
      <div>
        <Button variant="primary">Primary</Button>
      </div>
      <div>
        <Button variant="default">Default</Button>
      </div>
      <div>
        <Button size="large" variant="default">
          Large
        </Button>
      </div>
      <div>
        <Button size="large" variant="transparent">
          Transparent
        </Button>
      </div>
      <div>
        <Button size="icon" variant="default">
          <RiAddLine size={22} />
        </Button>
      </div>
      <div className="w-50">
        <InputText
          iconPrefix={<RiCalendarLine size={15} />}
          placeholder="Date"
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
          placeholder="Name"
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
      <div className="w-50">
        <InputText
          className="h-20"
          placeholder="Description"
          isClearable
          isMultiline
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
      <div className="w-50">
        <InputText
          className="h-20"
          placeholder="Message"
          size="large"
          isMultiline
          isRounded
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
