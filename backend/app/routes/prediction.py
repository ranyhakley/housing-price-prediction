from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Create an API router
router = APIRouter()

# Mapping for the classifier's output (replace with your actual mappings)
price_trend_mapping = {
    0: "Price Drop",
    1: "Price Rise by 5 percent",
    2: "Price Rise by 25 perecent or more"
}

# Load the pre-trained models
with open("app/models/decision_tree_regressor.pkl", "rb") as f:
    regressor = pickle.load(f)

with open("app/models/random_forest_classifier.pkl", "rb") as f:
    classifier = pickle.load(f)

# Define the input schema (10 features)
class HouseFeatures(BaseModel):
    KMfromCBD: float
    Postcode: int
    Bedroom: int
    Bathroom: int
    YearBuilt: int
    YearSold: int
    House: int
    Unit: int
    Townhouse: int
    TotalRooms: int

# Define the output schema
class PricePrediction(BaseModel):
    predicted_price: float
    price_trend: str

# Define the prediction endpoint
@router.post("/predict", response_model=PricePrediction)
def predict_price(features: HouseFeatures):
    # Prepare input data with 10 features
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

    try:
        # Predict house price using the regressor model
        predicted_price = regressor.predict(input_data)[0]

        # Predict price trend using the classifier model (returns numeric value)
        predicted_trend_numeric = classifier.predict(input_data)[0]

        # Map numeric trend to descriptive string
        predicted_trend = price_trend_mapping.get(predicted_trend_numeric, "unknown")

        return PricePrediction(predicted_price=predicted_price, price_trend=predicted_trend)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")



""" 
cd: backend
run: uvicorn app.main:app
Go to : localhost:8000/docs

Testing statement

{
  "KMfromCBD": 8.2,
  "Postcode": 3123,
  "Bedroom": 4,
  "Bathroom": 2,
  "YearBuilt": 1985,
  "YearSold": 2021,
  "House": 1,
  "Unit": 0,
  "Townhouse": 0,
  "TotalRooms": 7
}

{
  "KMfromCBD": 15.5,
  "Postcode": 3150,
  "Bedroom": 5,
  "Bathroom": 3,
  "YearBuilt": 2010,
  "YearSold": 2020,
  "House": 1,
  "Unit": 0,
  "Townhouse": 0,
  "TotalRooms": 9
}

{
  "KMfromCBD": 5.6,
  "Postcode": 3000,
  "Bedroom": 3,
  "Bathroom": 2,
  "YearBuilt": 1990,
  "YearSold": 2020,
  "House": 1,
  "Unit": 0,
  "Townhouse": 0,
  "TotalRooms": 5
}


"""