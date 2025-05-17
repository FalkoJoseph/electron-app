import { useEffect } from "react";

import { Calendar, Plus } from "lucide-react";

import { setPrimaryColor } from "@/stores/system/theme.store";
import useThemeStore from "@/stores/system/theme.store";
import { setTitlebarTitle } from "@/stores/system/titlebar.store";

import Button from "@/components/system/Button/Button";
import InputText from "@/components/system/Input/InputText";
import Select from "@/components/system/Select/Select";
import Switch from "@/components/system/Switch/Switch";

const Home = () => {
  const primaryColor = useThemeStore((state) => state.primaryColor);

  useEffect(() => {
    setTitlebarTitle(
      <p className="text-sm font-semibold pl-2 opacity-85">Components</p>,
    );
  }, []);

  return (
    <div className="flex flex-col p-5 gap-2">
      <div>
        <Button variant="accent">Primary</Button>
      </div>
      <div>
        <Button variant="default">Default</Button>
      </div>
      <div>
        <Button color="orange" variant="accent">
          Orange
        </Button>
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
          <Plus size={22} />
        </Button>
      </div>
      <div>
        <Switch />
      </div>
      <div className="flex items-start gap-2">
        <Select
          value={primaryColor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const color = e.target.value;
            setPrimaryColor(color as Parameters<typeof setPrimaryColor>[0]);
          }}
        >
          <option value="" disabled>
            Change accent color
          </option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="purple">Purple</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="sky">Sky</option>
          <option value="pink">Pink</option>
          <option value="lime">Lime</option>
          <option value="amber">Amber</option>
          <option value="emerald">Emerald</option>
          <option value="fuchsia">Fuchsia</option>
          <option value="rose">Rose</option>
          <option value="cyan">Cyan</option>
          <option value="teal">Teal</option>
          <option value="violet">Violet</option>
          <option value="indigo">Indigo</option>
        </Select>
        <Button variant="default">Save</Button>
      </div>
      <div>
        <Select variant="default">
          <option value="default">Dark</option>
          <option value="secondary">Light</option>
        </Select>
      </div>
      <div>
        <Select color="orange" width="full">
          <option value="default">Full</option>
          <option value="secondary">Auto</option>
        </Select>
      </div>
      <div className="w-50">
        <InputText
          iconPrefix={<Calendar size={15} />}
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
          minHeight={50}
          placeholder="Message (multiline)"
          isClearable
          isMultiline
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
      <div className="w-50">
        <InputText
          className="h-30"
          isAutosize={false}
          placeholder="Message"
          size="large"
          isMultiline
          isRounded
          onChange={(value) => {
            console.log("from the home:", value);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
