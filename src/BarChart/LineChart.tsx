import React, { useEffect } from "react";
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

const BarChart = ({
  data,
  width,
  height,
  xAxisLabel,
  yAxisLabel,
  lineColor = "#00bfa5",
}: BarChartPropType) => {
  const margin = {
    top: 40,
    right: 20,
    bottom: 50,
    left: 100,
  };

  const graphWidth = width
    ? width - margin.left - margin.right
    : 560 - margin.left - margin.right;
  const grapHeight = height
    ? height - margin.top - margin.bottom
    : 400 - margin.top - margin.bottom;

  const update = (data: Data[]) => {
    const svg = d3
      .select(".canvas")
      .append("svg")
      .attr("width", graphWidth + margin.left + margin.right)
      .attr("height", grapHeight + margin.top + margin.bottom);
    console.log(svg, "svgsvgsvg");

    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", grapHeight)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //scales
    const x = d3.scaleTime().range([0, graphWidth]);
    const y = d3.scaleLinear().range([grapHeight, 0]);

    //axes groups
    const xAxisGroup = graph
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${grapHeight})`);
    const yAxisGroup = graph.append("g").attr("class", "y-axis");

    // line path generator
    const line = d3
      .line<Data>()
      .x(function (d) {
        return x(d.xValue);
      })
      .y(function (d) {
        return y(d.yValue);
      });

    // line path element
    const path = graph.append("path");

    //dotted line group
    const dottedLines = graph
      .append("g")
      .attr("class", "lines")
      .style("opacity", 0);

    // create x dotted line and append dotted line grouop

    const xDottedLine = dottedLines
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    // create y dotted line and append dotted line grouop

    const yDottedLine = dottedLines
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    data.sort((a, b) => a.xValue - b.xValue);

    const xExtent = d3.extent(data, (d) => d.xValue);

    if (xExtent[0] && xExtent[1]) {
      x.domain(xExtent as [number, number]); // Type assertion as [Date, Date] since we've checked for undefined
    }

    // Set y-axis domain
    const yMax = d3.max(data, (d) => d.yValue);
    if (yMax !== undefined) {
      y.domain([0, yMax]); // Only set the domain if yMax is defined
    }

    path
      .data([data])
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 2)
      .attr("d", line);

    // create axes
    const xAxes = d3.axisBottom(x).ticks(4);
    const yAxes = d3
      .axisLeft(y)
      .ticks(4)
      .tickFormat((d) => d + "m");

    // call axes placein screen

    xAxisGroup.call(xAxes);
    yAxisGroup.call(yAxes);

    xAxisLabel &&
      svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width ? width : 560)
        .attr("y", height ? height - 6 : 400 - 6)
        .text(xAxisLabel);

    yAxisLabel &&
      svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text(yAxisLabel);

    xAxisGroup
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .attr("text-anchor", "end");
    //create circles for objects
    const circles = graph.selectAll("circle").data(data);
    //update current points
    circles.attr("cx", (d) => x(d.xValue)).attr("cy", (d) => y(d.yValue));
    // add new points
    circles
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", (d) => x(d.xValue))
      .attr("cy", (d) => y(d.yValue))
      .attr("fill", "#ccc");

    graph
      .selectAll("circle")
      .on("mouseover", (d, i) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(100)
          .attr("r", 8)
          .attr("fill", "#fff")
          .attr("stroke", "#000")
          .attr("stroke-width", 0.4)
          .attr("cursor", "pointer");
        const data = i as Data; // Cast 'i' to the correct type

        xDottedLine
          .attr("x1", x(data.xValue))
          .attr("x2", x(data.xValue))
          .attr("y1", grapHeight)
          .attr("y2", y(data.yValue));

        yDottedLine
          .attr("x1", 0)
          .attr("x2", x(data.xValue))
          .attr("y1", y(data.yValue))
          .attr("y2", y(data.yValue));

        dottedLines.style("opacity", 1);
      })
      .on("mouseleave", (d, i) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(100)
          .attr("r", 4)
          .attr("stroke", "#000")
          .attr("stroke-width", 0)
          .attr("fill", "#ccc")
          .attr("cursor", "pointer");
        dottedLines.style("opacity", 0);
      });

    circles.exit().remove();
  };

  useEffect(() => {
    if (data) {
      update(data);
    }
  }, [data]);

  return <div className="canvas"></div>;
};

export default BarChart;
