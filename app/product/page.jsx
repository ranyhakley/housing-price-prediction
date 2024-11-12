"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Papa from "papaparse";
import { ValidateForm } from "@/utils/utils";

// Components
import InputField from "@/components/input/InputField";
import SliderMap from "@/components/input/SliderMap";
import PropertyTypeSelector from "@/components/input/PropertyTypeSelector";
import ErrorMessage from "@/components/input/ErrorMessage";
const ScatterPlot = dynamic(() => import("@/components/visualization/ScatterPlot"), { ssr: false });
const BarChart = dynamic(() => import("@/components/visualization/BarChart"), { ssr: false });
const LineChart = dynamic(() => import("@/components/visualization/LineChart"), { ssr: false });

// Merged Component: ProductPage with Form and Visualizations
const ProductPage = () => {
  const router = useRouter();
  const [isPredictionMade, setIsPredictionMade] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [km, setKm] = useState(5); // Default value for KM from CBD
  const [formData, setFormData] = useState({
    KMfromCBD: km,
    Postcode: "",
    Bedroom: "",
    Bathroom: "",
    YearBuilt: "",
    YearSold: "",
    House: 0,
    Unit: 0,
    Townhouse: 0,
    TotalRooms: "",
  });
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // Function to handle changes in text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Spread existing form data to retain other fields
      [name]: value, // Update the specific field that was changed
    });
  };

  // Function to handle property type change
  const handlePropertyTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setFormData({
      ...formData,
      House: type === "House" ? 1 : 0,
      Unit: type === "Unit" ? 1 : 0,
      Townhouse: type === "Townhouse" ? 1 : 0,
    });
  };

  // Update formData when km changes
  const handleKmChange = (newKm) => {
    setKm(newKm);
    setFormData({ ...formData, KMfromCBD: newKm });
  };

  // Function to handle form submission and make a prediction request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = ValidateForm(formData, selectedType);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/predict", formData);
      setPredictions(response.data);
      setIsPredictionMade(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Server Error: ${err.response.data.message}`);
      } else {
        setError("Error while fetching prediction. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Function to load and parse CSV data
      const loadCSVData = async () => {
        try {
          const response = await fetch("final_processed_data.csv");
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
                Object.keys(row.data).forEach((column) => {
                  if (/^\d{4}to\d{4}$/.test(column)) {
                    priceFluctuations[column] = parseFloat(row.data[column]) || 0;
                  }
                });
  
                setData((prevData) => [
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
                    priceFluctuations,
                  },
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
              console.error("Error parsing CSV:", error);
              setLoading(false);
            },
          });
        } catch (error) {
          console.error("Error loading CSV file:", error);
          setLoading(false);
        }
      };
  
      loadCSVData();
    }
  }, []);
  

  if (loading) {
    return <p>Loading data...</p>;
  }

  // Function to convert a logged price to the actual price
  const convertLoggedPriceToActual = (loggedPrice) => {
    return Math.exp(loggedPrice); // Use exponential to convert logged price
  };

  // Function to format a number as currency (AUD)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "AUD", // Australian Dollar
    }).format(value);
  };

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* "Go Back" Navigation */}
      <div className="flex items-center mb-4 mt-8 cursor-pointer" onClick={() => router.back()}>
        <FaArrowLeft className="text-[#005a70] mr-2" size={20} />
        <span className="text-[#005a70] font-medium">Go Back</span>
      </div>

      <h1 className="text-2xl font-bold mb-4 text-center">House Price Prediction and Visualization</h1>

      {/* Form Component */}
      <div className="mx-auto min-h-screen max-w-6xl px-6 py-12 font-sans md:px-12 lg:px-24">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <SliderMap km={km} onKmChange={handleKmChange} />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <PropertyTypeSelector selectedType={selectedType} onChange={handlePropertyTypeChange} />
          <InputField label="Postcode" name="Postcode" value={formData.Postcode} onChange={handleInputChange} />
          <InputField label="Bedroom" name="Bedroom" value={formData.Bedroom} onChange={handleInputChange} />
          <InputField label="Bathroom" name="Bathroom" value={formData.Bathroom} onChange={handleInputChange} />
          <InputField label="Total Rooms" name="TotalRooms" value={formData.TotalRooms} onChange={handleInputChange} />
          <InputField label="Year Built" name="YearBuilt" value={formData.YearBuilt} onChange={handleInputChange} />
          <InputField label="Year Sold" name="YearSold" value={formData.YearSold} onChange={handleInputChange} />
          <button
            type="submit"
            disabled={loading}
            className="mt-6 px-8 py-3 text-md font-semibold text-[#005a70] border-[#005a70] bg-white rounded-full hover:bg-[#003e4e] transition-colors"
          >
            {loading ? 'Predicting...' : 'Get Prediction'}
          </button>
          <ErrorMessage message={error} />
        </form>
      </div>

      {/* Prediction Results and Visualizations */}
      {isPredictionMade && (
        <div className="mt-10 space-y-8">
          {/* Prediction Results Section */}
          {predictions && (
            <div className="mt-10 rounded-lg bg-gray-50 p-6 shadow-md text-center">
              <h2 className="text-2xl font-bold text-[#121212]">Prediction Results:</h2>
              <p className="mt-2 text-lg text-[#121212]">
                <strong>Predicted Price:</strong> {formatCurrency(convertLoggedPriceToActual(predictions.predicted_price))}
              </p>
              <p className="mt-1 text-lg text-gray-700">
                <strong>Price Trend:</strong> {predictions.price_trend}
              </p>
            </div>
          )}
          <div className="mt-5 rounded-lg bg-gray-50 p-6 shadow-md text-center">
            <div className="mb-4 text-center">
              <h1 className="text-3xl font-bold">House Price Prediction Visualizations</h1>
              <p>The predicted output will be highlighted <span className="text-red-500">red.</span></p>
            </div>
            {/* Visualizations */}
            <ScatterPlot data={data} predictedPrice={convertLoggedPriceToActual(predictions.predicted_price)} distanceFromCBD={parseInt(formData.KMfromCBD)} />
          </div>
          <div className="mt-5 rounded-lg bg-gray-50 p-6 shadow-md text-center">
            <BarChart data={data} />
          </div>
          <div className="mt-5 rounded-lg bg-gray-50 p-6 shadow-md text-center">
            <LineChart data={data} selectedPostcode={parseInt(formData.Postcode)} />
          </div>
      </div>
      )}
    </div>
  );
};

export default ProductPage;
