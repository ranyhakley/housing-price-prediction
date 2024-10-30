from fastapi import FastAPI
from app.routes.prediction import router as prediction_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define the origins that are allowed to access the backend
origins = [
    "http://localhost:3000",  # Your Next.js frontend URL
    # Add more origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # This allows requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# The rest of your FastAPI app logic

# Include the prediction routes
app.include_router(prediction_router)