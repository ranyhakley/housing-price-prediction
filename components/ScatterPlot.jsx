import React from 'react';
import Plot from 'react-plotly.js';

const ScatterPlot = ({ actualPrices, predictedPrices, labels }) => {
  return (
    <Plot
      data={[
        {
          x: labels,
          y: actualPrices,
          mode: 'markers',
          name: 'Actual Prices',
          marker: { color: 'blue' },
        },
        {
          x: labels,
          y: predictedPrices,
          mode: 'markers',
          name: 'Predicted Prices',
          marker: { color: 'red' },
        },
      ]}
      layout={{
        title: 'Actual vs Predicted House Prices',
        xaxis: { title: 'House ID or Year' },
        yaxis: { title: 'Price ($)' },
        hovermode: 'closest',
      }}
      config={{ scrollZoom: true, displayModeBar: true }}
    />
  );
};

export default ScatterPlot;
