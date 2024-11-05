from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, conint, constr
import pickle
import numpy as np

# Create a new API router to define endpoints related to predictions
router = APIRouter()

# Mapping for the classifier's output to human-readable labels
price_trend_mapping = {
    0: "Price Drop",
    1: "Price Rise by 5 percent",
    2: "Price Rise by 25 percent or more"
}

# Load the pre-trained models from pickle files
# The models are loaded once when the script runs to avoid repeated loading
with open("app/models/decision_tree_regressor.pkl", "rb") as f:
    regressor = pickle.load(f)

with open("app/models/random_forest_classifier.pkl", "rb") as f:
    classifier = pickle.load(f)

# Define the input schema using Pydantic, which provides built-in validation
class HouseFeatures(BaseModel):
    KMfromCBD: float = Field(..., ge=0, le=100, description="Distance from CBD in kilometers (0-100)")
    Postcode: str = Field(..., pattern=r"^\d{4}$", description="4-digit postcode")
    Bedroom: int = Field(..., ge=0, description="Number of bedrooms (non-negative integer)")
    Bathroom: int = Field(..., ge=0, description="Number of bathrooms (non-negative integer)")
    YearBuilt: str = Field(..., pattern=r"^\d{4}$", description="Year the house was built (4-digit year)")
    YearSold: str = Field(..., pattern=r"^\d{4}$", description="Year the house was sold (4-digit year)")
    House: int = Field(..., ge=0, le=1, description="1 if the property is a House, otherwise 0")
    Unit: int = Field(..., ge=0, le=1, description="1 if the property is a Unit, otherwise 0")
    Townhouse: int = Field(..., ge=0, le=1, description="1 if the property is a Townhouse, otherwise 0")
    TotalRooms: int = Field(..., ge=0, description="Total number of rooms (non-negative integer)")

    # Custom validation method to ensure that YearSold is not earlier than YearBuilt
    def validate_years(self):
        if int(self.YearSold) < int(self.YearBuilt):
            raise ValueError("Year Sold cannot be earlier than Year Built")

# Define the output schema for the response
class PricePrediction(BaseModel):
    predicted_price: float  # The predicted price of the house
    price_trend: str  # The predicted price trend (e.g., "Price Drop")

# Define the prediction endpoint
@router.post("/predict", response_model=PricePrediction)
def predict_price(features: HouseFeatures):
    try:
        # Perform custom validation to check that YearSold is not earlier than YearBuilt
        features.validate_years()

        # Prepare the input data as a 2D array (required by the models)
        input_data = np.array([[
            features.KMfromCBD,
            features.Postcode,
            features.Bedroom,
            features.Bathroom,
            features.YearBuilt,
            features.YearSold,
            features.House,
            features.Unit,
            features.Townhouse,
            features.TotalRooms
        ]])

        # Use the regressor model to predict the house price
        predicted_price = regressor.predict(input_data)[0]

        # Use the classifier model to predict the price trend
        predicted_trend_numeric = classifier.predict(input_data)[0]

        # Map the numeric trend to a descriptive string
        predicted_trend = price_trend_mapping.get(predicted_trend_numeric, "unknown")

        # Return the prediction results
        return PricePrediction(predicted_price=predicted_price, price_trend=predicted_trend)

    except ValueError as ve:
        # Raise an HTTP exception with a 400 status code for validation errors
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        # Catch other exceptions and return a 500 status code with a detailed error message
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
