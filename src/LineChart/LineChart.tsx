import React, { useEffect, useRef, useCallback } from "react";
import * as d3 from "d3";

export type Data = {
  xValue: number;
  yValue: number;
};

export interface BarChartPropType {
  data: Data[];
  width?: number;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  lineColor?: string;
}

const LineChart = ({
  data,
  width,
  height,
  xAxisLabel,
  yAxisLabel,
  lineColor = "orange",
}: BarChartPropType) => {
  const margin = { top: 40, right: 20, bottom: 50, left: 100 };
  const graphWidth = width ? width - margin.left - margin.right : 560 - margin.left - margin.right;
  const graphHeight = height ? height - margin.top - margin.bottom : 400 - margin.top - margin.bottom;
  const canvasRef = useRef(null);

  // Memoized update function to prevent re-creation on each render
  const update = useCallback((data: Data[]) => { 
    d3.select(canvasRef.current).selectAll("*").remove(); // Clean up previous elements

    const svg = d3.select(canvasRef.current)
      .append("svg")
      .attr("class", "lineChart")
      .attr("width", graphWidth + margin.left + margin.right)
      .attr("height", graphHeight + margin.top + margin.bottom);

    const graph = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([graphHeight, 0]);

    data.sort((a, b) => a.xValue - b.xValue);
    x.domain(d3.extent(data, (d) => d.xValue) as [number, number]);
    y.domain([0, d3.max(data, (d) => d.yValue) || 0]);

    const line = d3.line<Data>()
      .x((d) => x(d.xValue))
      .y((d) => y(d.yValue));

    graph.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2)
      .attr("d", line);

    const xAxisGroup = graph.append("g")
      .attr("transform", `translate(0,${graphHeight})`);
    const yAxisGroup = graph.append("g");

    xAxisGroup.call(d3.axisBottom(x).ticks(4));
    yAxisGroup.call(d3.axisLeft(y).ticks(4).tickFormat((d) => d + "m"));

    if (xAxisLabel) {
      svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", margin.left + graphWidth / 2) // Centered horizontally
        .attr("y", graphHeight + margin.top + 50) // Positioned below the x-axis
        .text(xAxisLabel);
    }

    if (yAxisLabel) {
      svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "middle")
        .attr("x", -(margin.top + graphHeight / 2)) // Centered vertically
        .attr("y", margin.left / 4) // Positioned with offset for visibility
        .attr("transform", "rotate(-90)")
        .text(yAxisLabel);
    }
  }, [data, graphWidth, graphHeight, lineColor, xAxisLabel, yAxisLabel]);

  useEffect(() => {
    if (data) {
      update(data);  // Only re-run `update` if `data` or other dependencies change
    }
  }, [data, update]);

  return <div ref={canvasRef} className="canvas"></div>;
};

export default LineChart;
