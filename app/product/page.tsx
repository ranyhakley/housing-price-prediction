"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; 

import InputForm from "@/components/input/InputForm";
import VisualizationDashboard from "@/components/visualization/VisualizationDashboard";

// Interface to define the structure of a prediction object
interface Prediction {
    predicted_price: number; // The predicted house price from the AI model
    price_trend: string; // The predicted trend (e.g., "rise", "lower", "exponential rise")
}

const ProductPage = () => {
    const router = useRouter(); // Use the correct useRouter from next/navigation

    // State to track if a prediction has been made; used to control the visibility of visualizations
    const [isPredictionMade, setIsPredictionMade] = useState(false);

    // Array to store multiple prediction results
    const [predictions, setPredictions] = useState<Prediction[]>([]);

    // Function to handle predictions made from the InputForm component
    const handlePrediction = (data: Prediction) => {
        // Add the new prediction to the existing list of predictions
        setPredictions([...predictions, data]);

        // Set the flag to true to indicate that a prediction has been made, triggering the display of visualizations
        setIsPredictionMade(true);
    };

    return (
        <>
            <div className="container mx-auto p-4 mt-8">
                {/* "Go Back" Navigation */}
                <div
                    className="flex items-center mb-4 mt-8 cursor-pointer"
                    onClick={() => router.back()}
                >
                    <FaArrowLeft className="text-[#005a70] mr-2" size={20} />
                    <span className="text-[#005a70] font-medium">Go Back</span>
                </div>

                {/* Main title of the web application */}
                <h1 className="text-2xl font-bold mb-4">House Price Prediction and Visualization</h1>

                {/* Form component for inputting house features and receiving predictions */}
                <InputForm onPrediction={handlePrediction} />

                {/* Conditional rendering: Only show visualizations if a prediction has been made */}
                {isPredictionMade && (
                    <div className="mt-8 space-y-8">
                        {/* Adds top margin and vertical spacing between charts */}
                        <div className="gap-8">
                            {/* Container to manage spacing between charts */}
                            <VisualizationDashboard csvPath="final_processed_data.csv" />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductPage;
