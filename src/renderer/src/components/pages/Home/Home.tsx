import { useEffect } from "react";

import {
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignEndHorizontal,
  Calendar,
  Plus,
} from "lucide-react";

import {
  setActiveColor,
  setTitlebarTitle,
  useThemeStore,
} from "@/uikit/stores";

import {
  Button,
  ButtonGroup,
  Checkbox,
  Form,
  FormGroup,
  FormHorizontal,
  FormItem,
  InputText,
  List,
  ListItem,
  Panel,
  RadioGroup,
  RadioGroupItem,
  Select,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/uikit";

const Home = () => {
  const activeColor = useThemeStore((state) => state.activeColor);

  useEffect(() => {
    setTitlebarTitle(
      <p className="text-sm font-semibold pl-2 opacity-85">Components</p>,
    );
  }, []);

  return (
    <div className="p-5">
      <Form hasDivider>
        <FormGroup label="Theme" subLabel="Change the theme of the app.">
          <FormItem>
            <Select
              value={activeColor}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const color = e.target.value;
                setActiveColor(color as Parameters<typeof setActiveColor>[0]);
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
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Tabs"
          subLabel="Tabs are used to switch between views."
        >
          <FormItem>
            <Tabs defaultValue="account">
              <TabsList isStretch>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account</TabsContent>
              <TabsContent value="password">Password</TabsContent>
            </Tabs>
          </FormItem>
        </FormGroup>

        <FormGroup label="Panel" hasMargin>
          <FormItem>
            <Panel>
              <div className="flex justify-between items-center">
                <p>Choose the color of the panel</p>
                <Select variant="default">
                  <option value="default">Dark</option>
                  <option value="secondary">Light</option>
                </Select>
              </div>
            </Panel>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="List"
          subLabel="List is used to display a list of items."
        >
          <FormItem>
            <Panel>
              <List>
                <ListItem
                  icon={<AlignCenterHorizontal size={18} />}
                  label="List item"
                  subLabel="Sublabel"
                />

                <ListItem
                  icon={<AlignCenterHorizontal size={18} />}
                  label="List item"
                  subLabel="Sublabel"
                />

                <ListItem
                  icon={<AlignCenterHorizontal size={18} />}
                  label="List item"
                  subLabel="Sublabel"
                />
              </List>
            </Panel>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Buttons"
          subLabel="Buttons are used to trigger actions."
        >
          <FormItem>
            <Button variant="accent">Accent</Button>
          </FormItem>

          <FormItem>
            <Button variant="default">Default</Button>
          </FormItem>

          <FormItem>
            <Button size="large" variant="default">
              Large
            </Button>
          </FormItem>

          <FormItem>
            <Button size="large" variant="transparent">
              Transparent
            </Button>
          </FormItem>

          <FormItem>
            <Button size="icon" variant="default">
              <Plus size={18} />
            </Button>
          </FormItem>

          <FormItem>
            <ButtonGroup variant="transparent">
              <Button variant="transparent-active" size="large">
                Button 1
              </Button>
              <Button variant="transparent-default" size="large">
                Button 2
              </Button>
              <Button variant="transparent-default" size="large">
                Button 3
              </Button>
            </ButtonGroup>
          </FormItem>

          <FormItem>
            <ButtonGroup>
              <Button variant="default" size="icon">
                <AlignCenterHorizontal size={18} />
              </Button>
              <Button variant="accent" size="icon">
                <AlignCenterVertical size={18} />
              </Button>
              <Button variant="default" size="icon">
                <AlignEndHorizontal size={18} />
              </Button>
            </ButtonGroup>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Slider"
          subLabel="Slider is used to select a value from a range."
        >
          <FormItem>
            <Slider defaultValue={[35]} max={100} />
          </FormItem>

          <FormItem>
            <Slider defaultValue={[20]} max={100} step={10} hasMarks />
          </FormItem>

          <FormItem>
            <Slider
              defaultValue={[50]}
              max={100}
              step={25}
              hasMarks
              markLabels={["Low", "Medium", "High", "Very High", "Max"]}
            />
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Toggles"
          subLabel="Toggles are used to switch between two states."
        >
          <FormItem>
            <Checkbox label="Checkbox item" />
          </FormItem>

          <FormItem>
            <Switch />
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Radio Vertical"
          subLabel="Radio Vertical is used to select an option from a list."
        >
          <FormItem>
            <RadioGroup defaultValue="option-one">
              <RadioGroupItem value="option-one" label="Option One" />
              <RadioGroupItem value="option-two" label="Option Two" />
            </RadioGroup>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Radio Horizontal"
          subLabel="Radio Horizontal is used to select an option from a list."
        >
          <FormItem>
            <RadioGroup defaultValue="option-horizontal" isHorizontal>
              <RadioGroupItem
                value="option-horizontal"
                label="Option Horizontal"
              />
              <RadioGroupItem value="option-vertical" label="Option Vertical" />
            </RadioGroup>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Horizontal Spread"
          subLabel="Horizontal with spread layout is used to display items in a horizontal row with spread layout."
        >
          <FormHorizontal align="start" isSpread>
            <FormItem>
              <p>Turn on this switch</p>
              <p className="text-xs opacity-55">For multiple settings</p>
            </FormItem>

            <FormItem>
              <Switch />
            </FormItem>
          </FormHorizontal>

          <FormHorizontal isSpread>
            <FormItem>
              <label htmlFor="checkbox-item">Turn on this checkbox</label>
            </FormItem>

            <FormItem>
              <Checkbox id="checkbox-item" />
            </FormItem>
          </FormHorizontal>
        </FormGroup>

        <FormGroup
          label="Horizontal Centered"
          subLabel="Horizontal with left labels is used to display items in a horizontal row with left labels."
        >
          <FormHorizontal isCentered>
            <FormItem isLabel>Turn on this switch:</FormItem>

            <FormItem isValue>
              <Switch />
            </FormItem>
          </FormHorizontal>

          <FormHorizontal isCentered>
            <FormItem isLabel>Turn on this checkbox:</FormItem>

            <FormItem isValue>
              <Select width="full">
                <option value="option-1">Option 1</option>
                <option value="option-2">Option 2</option>
              </Select>
            </FormItem>
          </FormHorizontal>
        </FormGroup>

        <FormGroup
          label="Select"
          subLabel="Select is used to select an option from a list."
        >
          <FormHorizontal>
            <FormItem>
              <Select>
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </Select>
            </FormItem>

            <FormItem>
              <Button variant="default">Save</Button>
            </FormItem>
          </FormHorizontal>

          <FormItem>
            <Select variant="default">
              <option value="default">Dark</option>
              <option value="secondary">Light</option>
            </Select>
          </FormItem>

          <FormItem>
            <Select width="full">
              <option value="default">Full</option>
              <option value="secondary">Auto</option>
            </Select>
          </FormItem>
        </FormGroup>

        <FormGroup
          label="Input"
          subLabel="Input fields are used to capture user input."
        >
          <FormItem className="w-50">
            <InputText
              placeholder="Number"
              type="number"
              min={0}
              max={5}
              onChange={(value) => {
                console.log("from the home:", value);
              }}
            />
          </FormItem>

          <FormItem className="w-50">
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
          </FormItem>

          <FormItem className="w-50">
            <InputText
              placeholder="Name"
              onChange={(value) => {
                console.log("from the home:", value);
              }}
            />
          </FormItem>

          <FormItem className="w-50">
            <InputText
              minHeight={50}
              placeholder="Message (multiline)"
              isClearable
              isMultiline
              onChange={(value) => {
                console.log("from the home:", value);
              }}
            />
          </FormItem>

          <FormItem className="w-50">
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
          </FormItem>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Home;
