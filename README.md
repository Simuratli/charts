# @simuratli/charts

A simple, customizable chart library for React.js. This package provides reusable chart components, like `LineChart`, to quickly integrate data visualizations into your React applications.

## Installation

Install the package via npm:

```
npm install @simuratli/charts
```

## Usage

### Line Chart

After installing, you can import and use the `LineChart` component in your project as shown below.

### Example

```import React from 'react';
import { LineChart } from '@simuratli/charts';

const App = () => {
  return (
    <div>
      <LineChart 
        data={[
          { xValue: 2, yValue: 10 },
          { xValue: 3, yValue: 15 },
          { xValue: 7, yValue: 17 },
          { xValue: 3, yValue: 25 },
        ]}
        width={560}
        height={560}
        lineColor='orange'
        xAxisLabel='X axis'
        yAxisLabel='Y axis'
      />
    </div>
  );
};

export default App;
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `Array` | \-  | Required. Array of objects with `xValue` and `yValue` keys. |
| `width` | `number` | 560 | Optional. The width of the chart. |
| `height` | `number` | 400 | Optional. The height of the chart. |
| `xAxisLabel` | `string` | \-  | Optional. Label for the x-axis. |
| `yAxisLabel` | `string` | \-  | Optional. Label for the y-axis. |
| `lineColor` | `string` | `orange` | Optional. Color of the line in the chart. |

### Data Format

The `data` prop should be an array of objects, each containing:

*   `xValue`: The x-coordinate (number)
*   `yValue`: The y-coordinate (number)

Example:

```

data={[
  { xValue: 2, yValue: 10 },
  { xValue: 3, yValue: 15 },
  { xValue: 7, yValue: 17 },
  { xValue: 3, yValue: 25 },
]}
```

<image src="https://github.com/Simuratli/charts/blob/master/src/LineChart/asset/linechart.png?raw=true" />

### Customization

*   **Dimensions**: Adjust `width` and `height` to control the chart's size.
*   **Axis Labels**: Use `xAxisLabel` and `yAxisLabel` to add labels to your axes.
*   **Line Color**: Change the line color with `lineColor`.


### BarChart

The `BarChart` component allows you to create a bar chart with customizable dimensions and colors.

#### Example

```

import React from 'react';
import { BarChart } from '@simuratli/charts';

const App = () => {
  return (
      <div>
        <BarChart 
            data={[
            { name: 'A', value: 30 },
            { name: 'B', value: 80 },
            { name: 'C', value: 45 },
            { name: 'D', value: 60 },
            ]}
            width={460}
            height={500}
            color='#69b3a2'
        />
    </div>
  );
};

export default App;
```

#### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `Array` | \-  | Required. Array of objects with `name` and `value` keys. |
| `width` | `number` | 460 | Optional. The width of the chart. |
| `height` | `number` | 500 | Optional. The height of the chart. |
| `color` | `string` | #69b3a2 | Optional. Color of the bars in the chart. |

#### Data Format

The `data` prop should be an array of objects, each containing:

*   `name`: The name of the category (string)
*   `value`: The value for the category (number)

Example:

```

data={[
  { name: 'A', value: 30 },
  { name: 'B', value: 80 },
  { name: 'C', value: 45 },
  { name: 'D', value: 60 },
]}
```

<image src="https://github.com/Simuratli/charts/blob/master/src/BartChart/asset/barchart.png?raw=true" />


#### Customization

*   **Dimensions**: Adjust `width` and `height` to control the chart's size.
*   **Bar Color**: Change the bar color with `color`.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open issues or pull requests for any features, bug fixes, or suggestions.

## Questions?

For any questions or issues, feel free to reach out.

- - -

Happy charting with `@simuratli/charts`!