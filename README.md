# House Price Prediction and Trend Analysis Web Application

This project is a full-stack web application for predicting house prices based on property details and providing insights into price trends. It combines a machine learning model with an interactive front end, allowing users to visualize predictions and explore historical property data.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Installation and Usage](#installation)
- [API Documentation](#api-documentation)
- [Data Sources](#data-sources)

---

## Project Overview

The House Price Prediction and Trend Analysis Web Application allows users to:
- Input property details to predict house prices.
- View trends in property prices through various visualizations.
- Explore price trends for properties based on factors like location, number of rooms, and year of construction.

The system leverages a machine learning model trained on real-world data to deliver accurate predictions and visual insights.

---

## Features

- **User-Friendly Input Form**: Collects property information like postcode, bedrooms, bathrooms, and more.
- **Real-Time Predictions**: Calculates predicted house prices and trends on the fly.
- **Interactive Visualizations**: Displays price trends, average prices by property type, and price fluctuations over time.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.
- **Accessible Interface**: Designed to meet accessibility standards for inclusive user experiences.

---

## Tech Stack

- **Front End**: Next.js, React, Tailwind CSS, D3.js
- **Back End**: FastAPI, Pydantic
- **Machine Learning**: Scikit-Learn (Regressor and Classifier)
- **Database**: CSV files for training and testing datasets
- **Deployment**: Vercel, GitHub Actions (for CI/CD)

---

## Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

- Node.js (version 14+)
- Python (version 3.8+)

---

## Environment Variables

Create a `.env` file in the project root to configure environment-specific variables.

```plaintext
# Front-End
NEXT_PUBLIC_API_URL=http://localhost:8000

# Back-End
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

---

## Installation

# 1. Clone the Repository on Github or Download the ZIP code
```
git clone https://github.com/your-username/house-price-prediction.git
cd house-price-prediction
```

# 2. Install all the Front-end Dependencies and run local server
```
npm install
npm run dev
```

# 3. Install Back-End Dependencies and run local server
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## API Documentation
The API documentation is generated with FastAPI's OpenAPI support and is available at:

Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc
Key Endpoints
1. POST /predict

- Description: Predicts house price and trend based on input property details.
- Request Body:
```
{
  "KMfromCBD": 10,
  "Postcode": "3000",
  "Bedroom": "3",
  "Bathroom": "2",
  "YearBuilt": "1990",
  "YearSold": "2021",
  "House": 1,
  "Unit": 0,
  "Townhouse": 0,
  "TotalRooms": "6"
}
```
- Response:
```
{
  "predicted_price": 920000,
  "price_trend": "Price Rise by 5%"
}
```

---

## Data Sources
This application uses a dataset of historical property values to train the model. Key features include:

- KMfromCBD
- Postcode
- Bedroom, Bathroom, TotalRooms
- YearBuilt, YearSold
- PriceClass (used for trend prediction)

---
