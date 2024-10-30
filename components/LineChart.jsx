import React from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ years, prices }) => {
  return (
    <Plot
      data={[
        {
          x: years,
          y: prices,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'green' },
        },
      ]}
      layout={{
        title: 'House Prices Over Time',
        xaxis: { title: 'Year' },
        yaxis: { title: 'Price ($)' },
      }}
    />
  );
};

export default LineChart;
