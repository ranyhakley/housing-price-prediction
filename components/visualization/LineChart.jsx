// LineChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content
  
    // Set up dimensions and margins
    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 60, left: 80 };
  
    // Group the data by postcode
    const postcodes = Array.from(new Set(data.map(d => d.Postcode))); // Get unique postcodes
    const groupedData = postcodes.map(postcode => {
      const postcodeData = [];
  
      // Extract fluctuation data for this postcode
      data.forEach(row => {
        if (row.Postcode === postcode) {
          Object.keys(row.priceFluctuations).forEach(yearPeriod => {
            const [startYear, endYear] = yearPeriod.split("to").map(Number);
            postcodeData.push({
              year: new Date(endYear, 0, 1), // Use the end year for plotting
              fluctuation: row.priceFluctuations[yearPeriod] // Fluctuation value
            });
          });
        }
      });
  
      return { postcode, data: postcodeData };
    });
  
    // Flatten all years for the xScale domain calculation
    const allYears = groupedData.flatMap(d => d.data.map(point => point.year));
    const allFluctuations = groupedData.flatMap(d => d.data.map(point => point.fluctuation));
  
    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(allYears))
      .range([margin.left, width - margin.right]);
  
    const yScale = d3.scaleLinear()
      .domain([d3.min(allFluctuations), d3.max(allFluctuations)]).nice()
      .range([height - margin.bottom, margin.top]);
  
    // Create and append axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
    const yAxis = d3.axisLeft(yScale).tickFormat(d => `${d.toFixed(1)}%`);
  
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);
  
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .text("Price Fluctuation (%)");
  
    // Line generator for price fluctuation
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.fluctuation))
      .curve(d3.curveMonotoneX);
  
    // Append lines for each postcode
    groupedData.forEach(group => {
      svg.append("path")
        .datum(group.data)
        .attr("fill", "none")
        .attr("stroke", d3.schemeCategory10[postcodes.indexOf(group.postcode) % 10]) // Use a color from the D3 color scheme
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("class", "line");
    });
  
    // Add circles for interactivity on each postcode line
    groupedData.forEach(group => {
      svg.selectAll(`.circle-${group.postcode}`)
        .data(group.data)
        .enter()
        .append("circle")
        .attr("class", `circle-${group.postcode}`)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.fluctuation))
        .attr("r", 5)
        .attr("fill", d3.schemeCategory10[postcodes.indexOf(group.postcode) % 10])
        .on("mouseover", (event, d) => {
          d3.select("body").append("div")
            .attr("id", "tooltip")
            .style("position", "absolute")
            .style("opacity", 1)
            .style("background-color", "white")
            .style("border", "1px solid lightgray")
            .style("padding", "5px")
            .style("border-radius", "5px")
            .style("pointer-events", "none")
            .style("color", "black")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`)
            .html(`
              <strong>Postcode:</strong> ${group.postcode}<br>
              <strong>Year:</strong> ${d.year.getFullYear()}<br>
              <strong>Fluctuation:</strong> ${d.fluctuation.toFixed(2)}%
            `);
        })
        .on("mousemove", (event) => {
          d3.select("#tooltip")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => {
          d3.select("#tooltip").remove();
        });
    });
  
  }, [data]);
  

  return <svg ref={svgRef} width={1000} height={600}></svg>;
};

export default LineChart;
