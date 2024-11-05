// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';

// const PieChart = ({ data }) => {
//   const svgRef = useRef(null);

//   useEffect(() => {
//     if (!svgRef.current) return;

//     d3.select(svgRef.current).selectAll("*").remove();

//     // Aggregate price trends
//     const trendCounts = d3.rollup(
//       data,
//       v => v.length,
//       d => d.PriceClass
//     );

//     const formattedData = Array.from(trendCounts, ([trend, count]) => ({ trend, count }));

//     // Chart dimensions and radius
//     const width = 400;
//     const height = 400;
//     const radius = Math.min(width, height) / 2;

//     const svg = d3.select(svgRef.current)
//       .attr("width", width)
//       .attr("height", height)
//       .append("g")
//       .attr("transform", `translate(${width / 2}, ${height / 2})`);

//     // Create color scale
//     const color = d3.scaleOrdinal()
//       .domain(formattedData.map(d => d.trend))
//       .range(d3.schemeCategory10);

//     // Create pie generator
//     const pie = d3.pie().value(d => d.count);

//     // Create arc generator
//     const arc = d3.arc().innerRadius(0).outerRadius(radius);

//     // Draw pie slices
//     svg.selectAll("path")
//       .data(pie(formattedData))
//       .enter()
//       .append("path")
//       .attr("d", arc)
//       .attr("fill", d => color(d.data.trend))
//       .attr("stroke", "white")
//       .attr("stroke-width", "2px")
//       .append("title")
//       .text(d => `${d.data.trend}: ${d.data.count} occurrences`);

//   }, [data]);

//   return <svg ref={svgRef}></svg>;
// };

// export default PieChart;
