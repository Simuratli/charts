import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Barchart,{BarChartPropTypes} from "./BarChart";


const data = [
    {
        name:"Azerbaijan",
        value:2423,
    },
    {
        name:"Russia",
        value:3456
    },
    {
        name:"Iran",
        value:5645
    },
    {
        name:'Turkey',
        value:3567
    }
]

const meta = {
  title: "Charts/BarChart",
  component: Barchart,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // data: {
    //   control: { type: "object" },
    //   description: "Data to be displayed in the Bar Chart",
    // },
    width: {
      control: { type: "number" },
      defaultValue: 560,
      description: "Width of the chart",
    },
    height: {
      control: { type: "number" },
      defaultValue: 400,
      description: "Height of the chart",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    data: data,
    width: 560,
    height: 400,
  },
} satisfies Meta<typeof Barchart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BarchartComponent: Story = {
  args: {
    data:data,
    width: 650,
    height:400,
    // xAxisLabel: "Elcan",
    // lineColor: "#f74a69",
  },
};
