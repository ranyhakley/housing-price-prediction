from fastapi import FastAPI
from app.routes.prediction import router as prediction_router
from fastapi.middleware.cors import CORSMiddleware

# Create an instance of the FastAPI application
app = FastAPI()

# Define the origins that are allowed to access the backend
origins = [
    "http://localhost:3000",  # Your Next.js frontend URL
    # Add more origins if needed to allow access from other sources
]

# Set up CORS (Cross-Origin Resource Sharing) middleware
# This is necessary to allow the frontend (running on a different origin) to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Specifies which origins are allowed
    allow_credentials=True,  # Allows cookies and authentication headers
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers in requests
)

# Include the prediction routes from the 'prediction' module
app.include_router(prediction_router)
