// BarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content

    // Set up dimensions and margins
    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 100, left: 80 };

    // Filter out data points with 6.5 Total Rooms
    const filteredData = data.filter(d => d.TotalRooms !== 6.5);

    // Aggregate the data to calculate average prices
    const aggregatedData = d3.rollups(
      filteredData,
      v => d3.mean(v, d => d.Price), // Calculate the average price
      d => `${d.Type} - ${d.TotalRooms} Rooms` // Group by Type and TotalRooms
    );

    // Convert aggregated data to an array of objects and sort by TotalRooms
    const formattedData = aggregatedData
      .map(([key, value]) => {
        const [type, roomsString] = key.split(" - ");
        const totalRooms = parseInt(roomsString); // Extract and convert TotalRooms to a number
        return {
          key,
          type,
          totalRooms,
          averagePrice: value
        };
      })
      .sort((a, b) => a.totalRooms - b.totalRooms); // Sort in ascending order by TotalRooms

    // Create a color scale for the property types
    const colorScale = d3.scaleOrdinal()
      .domain([...new Set(formattedData.map(d => d.type))]) // Unique property types
      .range(["brown", "orange", "green"]); // Add more colors as needed

    // Create scales
    const xScale = d3.scaleBand()
      .domain(formattedData.map(d => d.key))
      .range([margin.left, width - margin.right])
      .padding(0.1); // Add some padding between bars

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.averagePrice)]).nice() // Extend domain to the max average price
      .range([height - margin.bottom, margin.top]);

    // Create and append axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => `$${(d / 1000).toFixed(1)}k`); // Format prices in thousands

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(45)") // Rotate x-axis labels for better readability
      .style("text-anchor", "start");

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
      .text("Average Price ($)");

    // Create a tooltip element
    const tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "1px solid lightgray")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("color", "black"); // Tooltip text color

    // Append bars to the SVG
    svg.selectAll("rect")
      .data(formattedData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.key))
      .attr("y", d => yScale(d.averagePrice))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.averagePrice))
      .attr("fill", d => colorScale(d.type)) // Color code based on property type
      .on("mouseover", (event, d) => {
        // Show and update the tooltip on hover
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1)
          .html(`
            <strong>Type:</strong> ${d.type}<br>
            <strong>Total Rooms:</strong> ${d.totalRooms}<br>
            <strong>Average Price:</strong> $${d.averagePrice.toLocaleString()}
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

export default BarChart;
