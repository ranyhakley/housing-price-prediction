"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BarChart from '@/components/visualization/BarChart';
import LineChart from '@/components/visualization/LineChart';
import ScatterPlot from '@/components/visualization/ScatterPlot';

const VisualizationDashboard = ({ csvPath }) => {
  const [data, setData] = useState([]); // State to hold the parsed data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [selectedPostcode, setSelectedPostcode] = useState(""); // State to hold selected postcode

  useEffect(() => {
    // Function to load and parse CSV data
    const loadCSVData = async () => {
      try {
        const response = await fetch(csvPath);
        const csvText = await response.text();

        // Use PapaParse to parse the CSV data
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          worker: true,
          step: (row, parser) => {
            const yearSold = +row.data.YearSold;
            let type = "Unknown";
            if (+row.data.House === 1) type = "House";
            else if (+row.data.Unit === 1) type = "Unit";
            else if (+row.data.Townhouse === 1) type = "Townhouse";

            if (Math.random() < 0.01) {
              const priceFluctuations = {};
              Object.keys(row.data).forEach(column => {
                if (/^\d{4}to\d{4}$/.test(column)) {
                  priceFluctuations[column] = parseFloat(row.data[column]) || 0;
                }
              });

              setData(prevData => [
                ...prevData,
                {
                  KMfromCBD: +row.data.KMfromCBD,
                  Price: +row.data.Price,
                  Type: type,
                  YearBuilt: +row.data.YearBuilt,
                  YearSold: yearSold,
                  TotalRooms: +row.data.TotalRooms,
                  price_class_22_23: +row.data.price_class_22_23,
                  Postcode: +row.data.Postcode,
                  priceFluctuations
                }
              ]);
            }

            if (data.length >= 5000) {
              parser.abort();
              setLoading(false);
            }
          },
          complete: () => {
            setLoading(false);
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error loading CSV file:', error);
        setLoading(false);
      }
    };

    loadCSVData();
  }, [csvPath]);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className='text-black bg-white'>
      <h2>House Price Prediction Visualizations</h2>

      <div style={{ marginBottom: '50px' }}>
        <h3>Scatter Plot: KM from CBD vs. Price</h3>
        <ScatterPlot data={data} />
        {/* Needs predicted price, user input km from cbd */}
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Bar Chart: </h3>
        <BarChart data={data} />  
        {/* Needs Property Type user input, and Total Room user input */}
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Line Chart: </h3>
        {/* Pass the selected postcode to LineChart */}
        <LineChart data={data} selectedPostcode={3068} />
        {/* currently have a set postcode, need postcode user input */}
      </div>
    </div>
  );
};

export default VisualizationDashboard;
