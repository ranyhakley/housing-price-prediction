"use client"
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

// Example dataset with trend data by postcode
const trendData = [
  { postcode: '3000', trends: [10, 20, 5] },  // Example for Melbourne
  { postcode: '3001', trends: [15, 25, 10] }, // Example for East Melbourne
  { postcode: '3002', trends: [8, 30, 7] },   // Example for Southbank
];

const FilterableBarChart = () => {
  const [selectedPostcode, setSelectedPostcode] = useState('');
  const [filteredData, setFilteredData] = useState(trendData[0].trends);  // Default data

  // Filter the trend data based on postcode selection
  const handleFilterChange = (e) => {
    const postcode = e.target.value;
    setSelectedPostcode(postcode);

    // Find the matching postcode data
    const selectedData = trendData.find((data) => data.postcode === postcode);
    if (selectedData) {
      setFilteredData(selectedData.trends);  // Update chart with filtered data
    } else {
      setFilteredData([]);  // No data found for selected postcode
    }
  };

  return (
    <div>
      {/* Dropdown to select postcode filter */}
      <label htmlFor="postcode-select" className="block font-bold mb-2 text-black">Filter by Postcode:</label>
      <select
        id="postcode-select"
        value={selectedPostcode}
        onChange={handleFilterChange}
        className="border p-2 rounded w-full mb-4 text-black"
      >
        <option value="">Select Postcode</option>
        {trendData.map((data) => (
          <option key={data.postcode} value={data.postcode}>
            {data.postcode}
          </option>
        ))}
      </select>

      {/* Bar chart reflecting the filtered data */}
      <Plot
        data={[
          {
            x: ['Lower', 'Rise', 'Exponential Rise'],
            y: filteredData,  // Display filtered data
            type: 'bar',
          },
        ]}
        layout={{
          title: 'Filtered Price Trend Distribution',
          xaxis: { title: 'Price Trend' },
          yaxis: { title: 'Number of Houses' },
        }}
      />
    </div>
  );
};

export default FilterableBarChart;
