import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import LineChart, { Data } from "./LineChart";

const data: Data[] = [
  {
    xValue: 342,
    yValue: 500,
  },
  {
    xValue: 4353,
    yValue: 200,
  },
  {
    xValue: 465,
    yValue: 1800,
  },
  {
    xValue: 456,
    yValue: 100,
  },
];

const meta = {
  title: "Charts/LineChart",
  component: LineChart,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    data: {
      control: { type: "object" },
      description: "Data to be displayed in the Bar Chart",
    },
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
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LineChartComponent: Story = {
  args: {
    data: [
      {
        xValue: 123,
        yValue: 500,
      },
      {
        xValue: 345,
        yValue: 200,
      },
      {
        xValue: 356,
        yValue: 1800,
      },
      {
        xValue: 456,
        yValue: 100,
      },
    ],

    width: 650,
    xAxisLabel: "Elcan",
    lineColor: "#f74a69",
  },
};
