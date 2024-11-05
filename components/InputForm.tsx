"use client";
import { useState } from 'react';
import axios from 'axios';
import InputField from '../components/input/InputField';
import SliderMap from '../components/input/SliderMap';
import PropertyTypeSelector from '../components/input/PropertyTypeSelector';
import ErrorMessage from '../components/input/ErrorMessage';

// Props interface for the component
interface InputFormProps {
  onPrediction: (data: any) => void;  // Function to handle prediction results
}

// Interface for form data with initial default values
interface FormData {
  KMfromCBD: number;  // Distance from CBD in kilometers
  Postcode: string;  // 4-digit postcode
  Bedroom: string;  // Number of bedrooms as a string for easier input handling
  Bathroom: string;  // Number of bathrooms as a string for easier input handling
  YearBuilt: string;  // Year the house was built
  YearSold: string;  // Year the house was sold
  House: number;  // 1 if the property is a house, 0 otherwise
  Unit: number;  // 1 if the property is a unit, 0 otherwise
  Townhouse: number;  // 1 if the property is a townhouse, 0 otherwise
  TotalRooms: string;  // Total number of rooms as a string for easier input handling
}

// Interface for the prediction result
interface Prediction {
  predicted_price: number;  // Predicted price of the house
  price_trend: string;  // Price trend (e.g., "Price Drop")
}

// Main form component for house prediction
export default function HouseForm({ onPrediction }: InputFormProps) {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    KMfromCBD: 0,
    Postcode: '',
    Bedroom: '',
    Bathroom: '',
    YearBuilt: '',
    YearSold: '',
    House: 0,
    Unit: 0,
    Townhouse: 0,
    TotalRooms: '',
  });

  // State to track the selected property type
  const [selectedType, setSelectedType] = useState<string>('');

  // State to manage loading status during API requests
  const [loading, setLoading] = useState(false);

  // State to store error messages
  const [error, setError] = useState<string | null>(null);

  // State to store the prediction result
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  // Function to handle changes in text input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,  // Spread existing form data to retain other fields
      [name]: value,  // Update the specific field that was changed
    });
  };

  // HouseForm.tsx
  const handlePropertyTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;  // Extract the selected property type from the event
    setSelectedType(type);  // Update the selected property type
    setFormData({
      ...formData,
      House: type === 'House' ? 1 : 0,  // Set House to 1 if selected, otherwise 0
      Unit: type === 'Unit' ? 1 : 0,  // Set Unit to 1 if selected, otherwise 0
      Townhouse: type === 'Townhouse' ? 1 : 0,  // Set Townhouse to 1 if selected, otherwise 0
    });
  };

  // Function to validate form inputs
  const validateForm = () => {
    // Check if the postcode is exactly 4 digits
    if (!/^\d{4}$/.test(formData.Postcode)) return "Postcode must be exactly 4 digits.";

    // Check if Bedroom is a non-negative integer
    if (!/^\d+$/.test(formData.Bedroom) || parseInt(formData.Bedroom) < 0) {
      return "Bedroom must be a non-negative integer.";
    }

    // Check if Bathroom is a non-negative integer
    if (!/^\d+$/.test(formData.Bathroom) || parseInt(formData.Bathroom) < 0) {
      return "Bathroom must be a non-negative integer.";
    }

    // Check if YearBuilt is a valid 4-digit year
    if (!/^\d{4}$/.test(formData.YearBuilt)) return "Year Built must be a 4-digit year.";

    // Check if YearSold is a valid 4-digit year
    if (!/^\d{4}$/.test(formData.YearSold)) return "Year Sold must be a 4-digit year.";

    // Ensure that YearSold is not earlier than YearBuilt
    if (parseInt(formData.YearSold) < parseInt(formData.YearBuilt)) {
      return "Year Sold cannot be earlier than Year Built.";
    }

    // Check if a property type has been selected
    if (selectedType === '') return "Please select a property type.";

    // Check if TotalRooms is a non-negative integer
    if (!/^\d+$/.test(formData.TotalRooms) || parseInt(formData.TotalRooms) < 0) {
      return "Total Rooms must be a non-negative integer.";
    }

    return null;  // Return null if all validations pass
  };

  // Function to handle form submission and make a prediction request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Prevent the default form submission behavior

    // Validate the form inputs
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);  // Set the error message if validation fails
      return;
    }

    setLoading(true);  // Set loading status to true
    setError(null);  // Clear any previous error messages

    try {
      // Make a POST request to the backend with the form data
      const response = await axios.post('http://localhost:8000/predict', formData);

      // Set the prediction result and pass it to the parent component
      setPrediction(response.data);
      onPrediction(response.data);
    } catch (err: any) {
      // Handle errors from the API request
      if (axios.isAxiosError(err) && err.response) {
        setError(`Server Error: ${err.response.data.message}`);
      } else {
        setError('Error while fetching prediction. Please try again.');
      }
    } finally {
      setLoading(false);  // Set loading status to false
    }
  };

  // Function to convert a logged price to the actual price
  const convertLoggedPriceToActual = (loggedPrice: number) => {
    return Math.exp(loggedPrice);  // Use exponential to convert logged price
  };

  // Function to format a number as currency (AUD)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'AUD',  // Australian Dollar
    }).format(value);
  };    

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-12 font-sans md:px-12 lg:px-24">
      {/* Container with two columns */}
      <div className="text-black">
        {/* Column 1: SliderMap Component */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <SliderMap />
        </div>
  
        {/* Column 2: Input Fields and Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 bg-white p-8 rounded-lg shadow-lg"
        >
          <PropertyTypeSelector
            selectedType={selectedType}
            onChange={handlePropertyTypeChange}
          />
          <InputField
            label="Postcode"
            name="Postcode"
            value={formData.Postcode}
            onChange={handleInputChange}
          />
          <InputField
            label="Bedroom"
            name="Bedroom"
            value={formData.Bedroom}
            onChange={handleInputChange}
          />
          <InputField
            label="Bathroom"
            name="Bathroom"
            value={formData.Bathroom}
            onChange={handleInputChange}
          />
          <InputField
            label="Total Rooms"
            name="TotalRooms"
            value={formData.TotalRooms}
            onChange={handleInputChange}
          />
          <InputField
            label="Year Built"
            name="YearBuilt"
            value={formData.YearBuilt}
            onChange={handleInputChange}
          />
          <InputField
            label="Year Sold"
            name="YearSold"
            value={formData.YearSold}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Predicting...' : 'Get Prediction'}
          </button>
          <ErrorMessage message={error} />
        </form>
      </div>
  
      {/* Prediction Results Section */}
      {prediction && (
        <div className="mt-10 rounded-lg bg-gray-50 p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800">Prediction Results:</h2>
          <p className="mt-2 text-lg text-gray-700">
            <strong>Predicted Price:</strong>{' '}
            {formatCurrency(convertLoggedPriceToActual(prediction.predicted_price))}
          </p>
          <p className="mt-1 text-lg text-gray-700">
            <strong>Price Trend:</strong> {prediction.price_trend}
          </p>
        </div>
      )}
    </div>
  );
  
}
