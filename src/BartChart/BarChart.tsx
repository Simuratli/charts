import React, { useCallback, useEffect, useRef } from 'react'
import * as d3 from 'd3';

export interface BarChartDataType {
    name: string,
    value: number
}

export interface BarChartPropTypes {
    width?: number,
    height?: number,
    data: BarChartDataType[],
    color?: string;
}

const BarChart = ({ width = 460, height = 500, data, color = '#69b3a2' }: BarChartPropTypes) => {
    const canvasRef = useRef(null)
    var margin = { top: 30, right: 30, bottom: 70, left: 60 }


    const update = useCallback(
        (data: BarChartDataType[]) => {
            d3.select(canvasRef.current).selectAll("*").remove();
            const svg = d3.select(".canvas").append('svg').attr('width', width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            data = data.sort((a, b) => b.value - a.value);

            var x = d3.scaleBand().range([0, width]).domain(data.map(function (d) { return d.name; })).padding(0.2);
            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll("text").attr("transform", "translate(-10,0)rotate(-45)").style("text-anchor", "end");

            const max = d3.max(data.map((d) => d.value))

            var y = d3.scaleLinear().domain([0, Number(max)]).range([height, 0]);
            svg.append("g").call(d3.axisLeft(y));


            svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.name) || 0)
                .attr("y", d => y(d.value) || 0)
                .attr("width", x.bandwidth())
                .attr("height", function (d) { return height - y(d.value); })
                .attr("fill", color);

            
            svg.selectAll("rect").on("mouseover",(d)=>{
                d.currentTarget.style.fill = '#FA812F'
                d.currentTarget.style.cursor = 'pointer'
            })

            svg.selectAll("rect").on("mouseleave",(d)=>{
                d.currentTarget.style.fill = color
                d.currentTarget.style.cursor = ''
            })

        
        },
        [data, width, height, margin, color],
    )



    useEffect(() => {
        if (data) {
            update(data)
        }
    }, [data, update])



    return (
        <div ref={canvasRef} className='canvas'></div>
    )
}

export default BarChart
