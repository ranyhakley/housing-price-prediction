"use client"
import { useState } from 'react';
import axios from 'axios';

interface InputFormProps {
  onPrediction: (data: any) => void;
}

interface FormData {
    KMfromCBD: number | '';
    Postcode: string;
    Bedroom: number | '';
    Bathroom: number | '';
    YearBuilt: number | '';
    YearSold: number | '';
    House: number | '';
    Unit: number | '';
    Townhouse: number | '';
    TotalRooms: number | '';
  }
  
  interface Prediction {
    predicted_price: number;
    price_trend: string;
  }
  
  export default function HouseForm({ onPrediction }: InputFormProps) {
    const [formData, setFormData] = useState<FormData>({
      KMfromCBD: '',
      Postcode: '',
      Bedroom: '',
      Bathroom: '',
      YearBuilt: '',
      YearSold: '',
      House: '',
      Unit: '',
      Townhouse: '',
      TotalRooms: '',
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<Prediction | null>(null);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value),
      });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const response = await axios.post('http://localhost:8000/predict', formData);
        setPrediction(response.data);
        onPrediction(response.data);
      } catch (err) {
        setError('Error while fetching prediction.');
      } finally {
        setLoading(false);
      }
    };
  
  // Function to convert logged price to actual price
  const convertLoggedPriceToActual = (loggedPrice: number) => {
    return Math.exp(loggedPrice);
  };

// Function to format predicted price as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'AUD',  // You can change this to 'AUD', 'EUR', etc. based on your needs
    }).format(value);
    };

  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-zinc-800 rounded shadow-lg max-w-lg mx-auto">
        {/* KM from CBD */}
        <div>
            <label className="block font-bold">KM from CBD:</label>
            <input
            type="number"
            name="KMfromCBD"
            value={formData.KMfromCBD || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Postcode as dropdown */}
        <div>
            <label className="block font-bold">Postcode:</label>
            <input
            type="number"
            name="Postcode"
            value={formData.Postcode}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Bedroom */}
        <div>
            <label className="block font-bold">Bedroom:</label>
            <input
            type="number"
            name="Bedroom"
            value={formData.Bedroom || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Bathroom */}
        <div>
            <label className="block font-bold">Bathroom:</label>
            <input
            type="number"
            name="Bathroom"
            value={formData.Bathroom || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Total Rooms */}
        <div>
            <label className="block font-bold">Total Rooms:</label>
            <input
            type="number"
            name="TotalRooms"
            value={formData.TotalRooms || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Year Built as a year dropdown */}
        <div>
            <label className="block font-bold">Year Built:</label>
            <input
            type="number"
            name="YearBuilt"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.YearBuilt || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* Year Sold as a year dropdown */}
        <div>
            <label className="block font-bold">Year Sold:</label>
            <input
            type="number"
            name="YearSold"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.YearSold || ''}
            onChange={handleInputChange}
            className="border rounded p-2 w-full text-black"
            required
            />
        </div>

        {/* House as radio buttons */}
        <div>
            <label className="block font-bold">House (1 = Yes, 0 = No):</label>
            <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="House"
                value="1"
                checked={formData.House === 1}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="House"
                value="0"
                checked={formData.House === 0}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>No</span>
            </label>
            </div>
        </div>

        {/* Unit as radio buttons */}
        <div>
            <label className="block font-bold">Unit (1 = Yes, 0 = No):</label>
            <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="Unit"
                value="1"
                checked={formData.Unit === 1}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="Unit"
                value="0"
                checked={formData.Unit === 0}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>No</span>
            </label>
            </div>
        </div>

        {/* Townhouse as radio buttons */}
        <div>
            <label className="block font-bold">Townhouse (1 = Yes, 0 = No):</label>
            <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="Townhouse"
                value="1"
                checked={formData.Townhouse === 1}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="Townhouse"
                value="0"
                checked={formData.Townhouse === 0}
                onChange={handleInputChange}
                className="form-radio"
                />
                <span>No</span>
            </label>
            </div>
        </div>
        <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
        >
            {loading ? 'Predicting...' : 'Get Prediction'}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        </form>
    {/* Display the formatted prediction result */}
    {prediction && (
        <div className="mt-6 bg-gray-100 p-4 rounded shadow-lg text-black">
          <h2 className="text-xl font-semibold">Prediction Results:</h2>
          <p>
            <strong>Predicted Price:</strong> {formatCurrency(convertLoggedPriceToActual(prediction.predicted_price))}
          </p>
          <p><strong>Price Trend:</strong> {prediction.price_trend}</p>
        </div>
      )}    
    </div>
  );
}
