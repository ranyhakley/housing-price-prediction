import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data, selectedPostcode }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous content

    // Set up dimensions and margins
    const width = 1000;
    const height = 600;
    const margin = { top: 50, right: 50, bottom: 60, left: 80 };

    // Filter the data to only include the selected postcode
    const filteredData = data.filter(d => d.Postcode === selectedPostcode);

    // If there is no data for the selected postcode, display a message
    if (filteredData.length === 0) {
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text(`No information available for the selected postcode: ${selectedPostcode}`);
      return;
    }

    // Extract fluctuation data for the selected postcode
    const postcodeData = [];
    filteredData.forEach(row => {
      Object.keys(row.priceFluctuations).forEach(yearPeriod => {
        const [endYear] = yearPeriod.split("to").map(Number);
        postcodeData.push({
          year: new Date(endYear, 0, 1), // Use the end year for plotting
          fluctuation: row.priceFluctuations[yearPeriod], // Fluctuation value
        });
      });
    });

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(postcodeData, d => d.year))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(postcodeData, d => d.fluctuation), d3.max(postcodeData, d => d.fluctuation)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Create and append axes
    const xAxisGroup = svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")));

    const yAxisGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).tickFormat(d => `${d.toFixed(1)}%`));

    yAxisGroup.append("text")
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

    // Append the line for the selected postcode
    const linePath = svg.append("path")
      .datum(postcodeData)
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Create a single tooltip element for the entire chart
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

    // Add circles for interactivity
    const circles = svg.selectAll(".circle-point")
      .data(postcodeData)
      .enter()
      .append("circle")
      .attr("class", "circle-point")
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.fluctuation))
      .attr("r", 5)
      .attr("fill", "brown")
      .on("mouseover", (event, d) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY + 10}px`)
          .style("opacity", 1)
          .html(`
            <strong>Postcode:</strong> ${selectedPostcode}<br>
            <strong>Year:</strong> ${d.year.getFullYear()}<br>
            <strong>Fluctuation:</strong> ${d.fluctuation.toFixed(2)}%
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

    // Function to update chart elements on zoom
    function updateChart(event) {
      // Retrieve the new transformation
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);

      // Update the axes with the new scales
      xAxisGroup.call(d3.axisBottom(newXScale).tickFormat(d3.timeFormat("%Y")));
      yAxisGroup.call(d3.axisLeft(newYScale).tickFormat(d => `${d.toFixed(1)}%`));

      // Update the line and circles with the new scales
      linePath.attr("d", d3.line()
        .x(d => newXScale(d.year))
        .y(d => newYScale(d.fluctuation))
        .curve(d3.curveMonotoneX)
      );

      circles
        .attr("cx", d => newXScale(d.year))
        .attr("cy", d => newYScale(d.fluctuation));
    }

    // Set up zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([[0, 0], [width, height]])
      .extent([[0, 0], [width, height]])
      .on("zoom", updateChart);

    // Apply zoom behavior to the SVG
    svg.call(zoom);

  }, [data, selectedPostcode]);

  return <svg ref={svgRef} width={1000} height={600}></svg>;
};

export default LineChart;
