import { useEffect } from "react";

import { Calendar, Plus } from "lucide-react";

import {
  setPrimaryColor,
  setTitlebarTitle,
  useThemeStore,
} from "@/uikit/stores";

import {
  Button,
  Checkbox,
  Form,
  FormGroup,
  FormHorizontal,
  InputText,
  Select,
  Switch,
} from "@/uikit";

const Home = () => {
  const primaryColor = useThemeStore((state) => state.primaryColor);

  useEffect(() => {
    setTitlebarTitle(
      <p className="text-sm font-semibold pl-2 opacity-85">Components</p>,
    );
  }, []);

  return (
    <div className="p-5">
      <Form>
        <FormGroup
          label="Buttons"
          subLabel="Buttons are used to trigger actions."
        >
          <div>
            <Button variant="accent">Primary</Button>
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
              <Plus size={18} />
            </Button>
          </div>
        </FormGroup>

        <FormGroup
          label="Toggles"
          subLabel="Toggles are used to switch between two states."
        >
          <div>
            <Checkbox label="Checkbox item" />
          </div>

          <div>
            <Switch />
          </div>
        </FormGroup>

        <FormGroup
          label="Horizontal"
          subLabel="Horizontal is used to display items in a horizontal row."
        >
          <FormHorizontal align="start" isSpread>
            <div>
              <p>Turn on this switch</p>
              <p className="text-xs opacity-55">For multiple settings</p>
            </div>
            <Switch />
          </FormHorizontal>

          <FormHorizontal isSpread>
            <label htmlFor="checkbox-item">Turn on this checkbox</label>
            <Checkbox id="checkbox-item" />
          </FormHorizontal>
        </FormGroup>

        <FormGroup
          label="Select"
          subLabel="Select is used to select an option from a list."
        >
          <FormHorizontal>
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
          </FormHorizontal>

          <div>
            <Select variant="default">
              <option value="default">Dark</option>
              <option value="secondary">Light</option>
            </Select>
          </div>

          <div>
            <Select width="full">
              <option value="default">Full</option>
              <option value="secondary">Auto</option>
            </Select>
          </div>
        </FormGroup>

        <FormGroup
          label="Input"
          subLabel="Input fields are used to capture user input."
        >
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
        </FormGroup>
      </Form>
    </div>
  );
};

export default Home;
