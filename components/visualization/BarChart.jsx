"use client"

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const [selectedType, setSelectedType] = useState("All"); // Default to 'All'

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content

    // Set up dimensions and margins
    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 100, left: 80 };

    // Filter the data based on the selected property type
    const filteredData = selectedType === "All" 
      ? data.filter(d => d.TotalRooms !== 6.5) // Show all property types
      : data.filter(d => d.Type === selectedType && d.TotalRooms !== 6.5); // Filter by selected type

    // Aggregate the data to calculate average prices
    const aggregatedData = d3.rollups(
      filteredData,
      v => d3.mean(v, d => d.Price),
      d => `${d.Type} - ${d.TotalRooms} Rooms`
    );

    // Convert aggregated data to an array of objects and sort by TotalRooms
    const formattedData = aggregatedData
      .map(([key, value]) => {
        const [type, roomsString] = key.split(" - ");
        const totalRooms = parseInt(roomsString);
        return {
          key,
          type,
          totalRooms,
          averagePrice: value
        };
      })
      .sort((a, b) => a.totalRooms - b.totalRooms);

    // Create a color scale with specific colors for each property type
    const colorScale = d3.scaleOrdinal()
      .domain(["House", "Unit", "Townhouse"])
      .range(["#1f77b4", "#ff7f0e", "#2ca02c"]); // Colors for House, Unit, Townhouse

    // Create scales
    const xScale = d3.scaleBand()
      .domain(formattedData.map(d => d.key))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(formattedData, d => d.averagePrice)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Create and append axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => `$${(d / 1000).toFixed(1)}k`);

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(45)")
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
      .style("color", "black");

    // Append bars to the SVG
    svg.selectAll("rect")
      .data(formattedData)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.key))
      .attr("y", d => yScale(d.averagePrice))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d.averagePrice))
      .attr("fill", d => colorScale(d.type)) // Use specific colors based on property type
      .on("mouseover", (event, d) => {
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
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

  }, [data, selectedType]);

  return (
    <div>
      {/* Radio Buttons for Filtering */}
      <div className="filter-controls" style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="radio"
            value="All"
            checked={selectedType === "All"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          All
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="House"
            checked={selectedType === "House"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          House
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="Unit"
            checked={selectedType === "Unit"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          Unit
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="Townhouse"
            checked={selectedType === "Townhouse"}
            onChange={(e) => setSelectedType(e.target.value)}
          />
          Townhouse
        </label>
      </div>

      <svg ref={svgRef} width={1000} height={600}></svg>
    </div>
  );
};

export default BarChart;
