"use client"

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import BarChart from '../components/visualization/BarChart';
import LineChart from '../components/visualization/LineChart';
import ScatterPlot from '../components/visualization/ScatterPlot';


const VisualizationDashboard = ({ csvPath }) => {
  const [data, setData] = useState([]); // State to hold the parsed data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Function to load and parse CSV data
    const loadCSVData = async () => {
      try {
        const response = await fetch(csvPath); // Fetch the CSV file
        const csvText = await response.text(); // Read the file content as text

        // Use PapaParse to parse the CSV data
        Papa.parse(csvText, {
          header: true, // Use the first row as headers
          skipEmptyLines: true, // Skip empty lines to avoid unnecessary data
          worker: true, // Use a Web Worker to parse data in a background thread
          // `step` function handles each row as it is parsed
          step: (row, parser) => {
            // Random sampling: Collect only a small subset of the data
            // Here, we're taking approximately 1% of the rows
            // This reduces the data size significantly, making the app load faster

            const yearSold = +row.data.YearSold;
            // Determine the property type from the one-hot-encoded columns
            let type = "Unknown"; // Default to "Unknown"
            if (+row.data.House === 1) type = "House";
            else if (+row.data.Unit === 1) type = "Unit";
            else if (+row.data.Townhouse === 1) type = "Townhouse";
            
            if (Math.random() < 0.01) {
              // Extract the price fluctuation data
              const priceFluctuations = {};
              Object.keys(row.data).forEach(column => {
                if (/^\d{4}to\d{4}$/.test(column)) { // Match columns with "YYYYtoYYYY" format
                  priceFluctuations[column] = parseFloat(row.data[column]) || 0; // Parse fluctuation value
                }
              });
            
              setData(prevData => [
                ...prevData,
                {
                  KMfromCBD: +row.data.KMfromCBD, // Convert string to number
                  Price: +row.data.Price,         // Convert string to number
                  Type: type,                     // Property type as string
                  YearBuilt: +row.data.YearBuilt, // Convert string to number
                  YearSold: yearSold,
                  TotalRooms: +row.data.TotalRooms,
                  price_class_22_23: +row.data.price_class_22_23,
                  Postcode: +row.data.Postcode,   // Include Postcode
                  priceFluctuations               // Include the price fluctuation data as an object
                }
              ]);
            }

            // If enough data has been collected, stop parsing
            // We use `parser.abort()` to halt parsing once we have enough data
            // This ensures a quick initial load, but we could load more data progressively
            if (data.length >= 5000) { // Adjust this value based on performance needs
              parser.abort();
              setLoading(false); // Data is ready, stop showing the loading message
            }
          },
          // `complete` function is called when parsing finishes or is aborted
          complete: () => {
            setLoading(false); // Parsing complete, hide the loading message
          },
          // Handle errors during parsing
          error: (error) => {
            console.error('Error parsing CSV:', error); // Log the error
            setLoading(false); // Stop loading if an error occurs
          },
        });
      } catch (error) {
        console.error('Error loading CSV file:', error); // Log any errors from the fetch call
        setLoading(false); // Stop loading if an error occurs
      }
    };

    loadCSVData(); // Call the function to load data when the component mounts
  }, [csvPath]); // Dependency array ensures this effect runs when `csvPath` changes

  // Show a loading message until data is ready
  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className='text-black bg-white'>
      <h2>House Price Prediction Visualizations</h2>

      <div style={{ marginBottom: '50px' }}>
        <h3>Scatter Plot: KM from CBD vs. Price</h3>
        {/* Pass the parsed data to the ScatterPlot component */}
        <ScatterPlot data={data} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Bar Chart: </h3>
        {/* Pass the parsed data to the BarChart component */}
        <BarChart data={data} />
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h3>Line Chart: </h3>
        {/* Pass the parsed data to the LineChart component */}
        <LineChart data={data} />
      </div>
    </div>
  );
};

export default VisualizationDashboard;
