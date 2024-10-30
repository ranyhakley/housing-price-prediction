"use client"
import { useState } from 'react';
import InputForm from '../components/InputForm';  // Form component
import ScatterPlot from '../components/ScatterPlot';  // Scatter plot component
import LineChart from '../components/LineChart';  // Line chart component
import FilterableBarChart from '../components/FilterableBarChart';  // Filterable bar chart

interface Prediction {
  predicted_price: number;
  price_trend: string;
}

const Home = () => {
  const [isPredictionMade, setIsPredictionMade] = useState(false);  // New state to track if the prediction has been made
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [actualPrices, setActualPrices] = useState<number[]>([900000, 1100000, 1050000]);
  const [predictedPrices, setPredictedPrices] = useState<number[]>([920000, 1150000, 1020000]);
  const [years, setYears] = useState<number[]>([2010, 2015, 2020]);

  const handlePrediction = (data: Prediction) => {
    // Set the prediction state and display charts
    setPredictions([...predictions, data]);
    setIsPredictionMade(true);  // Set to true once the prediction is made

    // Update actual and predicted prices (replace this with real logic)
    setActualPrices([...actualPrices, data.predicted_price]);
    setPredictedPrices([...predictedPrices, data.predicted_price]);

    // You can update other datasets (e.g., trend data or years) based on your use case
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">House Price Prediction and Visualization</h1>

      {/* House prediction form */}
      <InputForm onPrediction={handlePrediction} />

      {/* Show visualizations only after prediction */}
      {isPredictionMade && (
        <div className="mt-8 space-y-8">
          {/* Use a grid layout to space the charts */}
          <div className="gap-8">
            {/* Scatter Plot: Actual vs Predicted Prices */}
            <div className="bg-white p-6 rounded shadow">
              <ScatterPlot
                actualPrices={actualPrices}
                predictedPrices={predictedPrices}
                labels={years}  // Example label: could be house IDs or years
              />
            </div>

            {/* Filterable Bar Chart: Price Trend Distribution by Postcode */}
            <div className="bg-white p-6 rounded shadow">
              <FilterableBarChart />
            </div>

            {/* Line Chart: House Prices Over Time */}
            <div className="bg-white p-6 rounded shadow">
              <LineChart years={years} prices={actualPrices} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
