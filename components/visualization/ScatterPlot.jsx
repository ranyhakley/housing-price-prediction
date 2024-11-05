// ScatterPlot.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content

    // Set up dimensions and margins
    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 60, left: 80 };

    // Create a white background for the entire SVG
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "white");

    // Create scales with reversed ranges
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Price) * 1.1]) // Reverse: Highest price to lowest price
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.max(data, d => d.KMfromCBD) * 1.1, 0]) // Normal: Closest to furthest
      .range([margin.top, height - margin.bottom]);

    // Create a color scale for the circles using a green to orange gradient
    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.KMfromCBD)]) // Map distance to the gradient
      .range(["green", "orange"]); // Green for lower values, orange for higher values

    // Append the axes groups
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(10));

    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(10));

    // Add labels to the axes
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Price ($)");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", 20)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .style("font-size", "16px")
      .text("Distance from CBD (KM)");

    // Function to update the chart when zooming
    function updateChart(event) {
      // Retrieve the new transformation
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);

      // Update the axes with the new scales
      xAxisGroup.call(d3.axisBottom(newXScale).ticks(10));
      yAxisGroup.call(d3.axisLeft(newYScale).ticks(10));

      // Update the circles with the new scales
      svg.selectAll("circle")
        .attr("cx", d => newXScale(d.Price))
        .attr("cy", d => newYScale(d.KMfromCBD));
    }

    // Set the zoom and pan features with limits
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5]) // Controls how much you can zoom out (0.5x) and zoom in (5x)
      .translateExtent([[0, 0], [width, height]]) // Restricts panning within the specified area
      .extent([[0, 0], [width, height]]) // Area within which zooming is allowed
      .on("zoom", updateChart);

    svg.call(zoom);

    // Create a tooltip element
    const tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "1px solid lightgray")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none");

    // Add circles to the scatter plot with the gradient color
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.Price))
      .attr("cy", d => yScale(d.KMfromCBD))
      .attr("r", 5)
      .attr("fill", d => colorScale(d.KMfromCBD)) // Apply the green to orange gradient
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        // Show and update the tooltip on hover
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1)
          .style("color", "black") // Set the text color to black
          .html(`
            <strong>Price:</strong> $${d.Price.toLocaleString()}<br>
            <strong>Distance from CBD:</strong> ${d.KMfromCBD} KM
          `);
      })
      .on("mousemove", (event) => {
        // Update tooltip position as the mouse moves
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        // Hide the tooltip when the mouse leaves
        tooltip.style("opacity", 0);
      });

  }, [data]);

  return <svg ref={svgRef} width={1000} height={600}></svg>;
};

export default ScatterPlot;
