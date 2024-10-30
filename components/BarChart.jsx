import React from 'react';
import Plot from 'react-plotly.js';

const BarChart = ({ trendData }) => {
  return (
    <Plot
      data={[
        {
          x: ['Lower', 'Rise', 'Exponential Rise'],
          y: trendData,
          type: 'bar',
        },
      ]}
      layout={{
        title: 'Predicted Price Trend Distribution',
        xaxis: { title: 'Price Trend' },
        yaxis: { title: 'Number of Houses' },
      }}
    />
  );
};

export default BarChart;
