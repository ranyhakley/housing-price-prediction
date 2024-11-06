import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ScatterPlot = ({ data, predictedPrice, distanceFromCBD }) => {
  const svgRef = useRef();
  const [kmRange, setKmRange] = useState([0, 20]); // Initial range for KM from CBD
  const [priceRange, setPriceRange] = useState([0, 2000000]); // Initial range for Price

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
      .domain([0, d3.max(data, d => d.Price) * 1.1])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.max(data, d => d.KMfromCBD) * 1.1, 0])
      .range([margin.top, height - margin.bottom]);

    // Restore the gradient color scale for the circles
    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.KMfromCBD)])
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

    // Filter data based on the selected KM and Price ranges
    const filteredData = data.filter(d => 
      d.KMfromCBD >= kmRange[0] && d.KMfromCBD <= kmRange[1] &&
      d.Price >= priceRange[0] && d.Price <= priceRange[1]
    );

    // Add circles to the scatter plot with the gradient color
    svg.selectAll("circle.data-point")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => xScale(d.Price))
      .attr("cy", d => yScale(d.KMfromCBD))
      .attr("r", 5)
      .attr("fill", d => colorScale(d.KMfromCBD))
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        // Show and update the tooltip on hover
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1)
          .style("color", "black")
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

    // Add the additional circle for the predicted plot
    const predictedCircle = svg.append("circle")
      .attr("class", "predicted-point")
      .attr("cx", xScale(predictedPrice))
      .attr("cy", yScale(distanceFromCBD))
      .attr("r", 8)
      .attr("fill", "red")
      .attr("opacity", 0.8)
      .on("mouseover", (event) => {
        // Show the tooltip for the additional circle
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1)
          .style("color", "black")
          .html(`
            <strong>Predicted Price:</strong> $${predictedPrice.toLocaleString()}<br>
            <strong>Distance from CBD:</strong> ${distanceFromCBD} KM
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

    // Function to update the chart when zooming
    function updateChart(event) {
      // Retrieve the new transformation
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);

      // Update the axes with the new scales
      xAxisGroup.call(d3.axisBottom(newXScale).ticks(10));
      yAxisGroup.call(d3.axisLeft(newYScale).ticks(10));

      // Update the data points with the new scales
      svg.selectAll("circle.data-point")
        .attr("cx", d => newXScale(d.Price))
        .attr("cy", d => newYScale(d.KMfromCBD));

      // Update the predicted circle with the new scales
      predictedCircle
        .attr("cx", newXScale(predictedPrice))
        .attr("cy", newYScale(distanceFromCBD));
    }

    // Set the zoom and pan features with limits
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
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

  }, [data, predictedPrice, distanceFromCBD, kmRange, priceRange]);

  return (
    <div>
      {/* Filter Controls for KM and Price Ranges */}
      <div className="filter-controls" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>KM from CBD:</label>
          <input
            type="range"
            min="0"
            max="50"
            value={kmRange[0]}
            onChange={(e) => setKmRange([+e.target.value, kmRange[1]])}
            style={{ margin: '0 10px' }}
          />
          <input
            type="range"
            min="0"
            max="50"
            value={kmRange[1]}
            onChange={(e) => setKmRange([kmRange[0], +e.target.value])}
            style={{ margin: '0 10px' }}
          />
          <span>{kmRange[0]} km - {kmRange[1]} km</span>
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>Price:</label>
          <input
            type="range"
            min="0"
            max="2000000"
            step="10000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            style={{ margin: '0 10px' }}
          />
          <input
            type="range"
            min="0"
            max="2000000"
            step="10000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            style={{ margin: '0 10px' }}
          />
          <span>${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</span>
        </div>
      </div>
      <svg ref={svgRef} width={1000} height={600}></svg>
    </div>
  );
};

export default ScatterPlot;
