# Housing Price Prediction Project

## Overview
This project utilizes machine learning models to predict future house prices based on historical data. 
It preprocesses the data, performs feature engineering, trains different models, and generates predictions. 
The project is designed to be run in Google Colab, Jupyter Notebook, or directly as a Python script.

## How to Run the Project
   - Extract the "Group1017-source_code.zip"
### Option 1: Running on Google Colab
1. **Upload Project Files to Google Drive**:
   - Ensure that the project folder is uploaded to your Google Drive on "MyDrive". In this case the project folder is named "Group1017-source_code"
   
2. **Open Google Colab**:
   - Go to [Google Colab](https://colab.research.google.com) and sign in with your Google account.

3. **Mount Google Drive**:
   - Make sure to run the cell in "For Google Colab"

4. **Navigate to the Project Folder**:
   - After mounting your drive, navigate to the project folder where the notebook file (`housing_price_prediction.ipynb`) is stored.
   - /content/drive/MyDrive/Group1017-source_code/

5. **Run the Notebook**:
   - Open `housing_price_prediction.ipynb` and execute the cells step by step to preprocess the data, train the models, and generate predictions.

### Option 2: Running on Jupyter Notebook
1. **Clone or Download the Repository**:
   - Clone or download the repository containing the project files to your local machine.
   
2. **Install Dependencies**:
   - Ensure all required libraries are installed by running the following command:
     ```bash
     pip install -r requirements.txt
     ```

3. **Launch Jupyter Notebook**:
   - Open a terminal or command prompt, navigate to the project folder, and run:
     ```bash
     jupyter notebook
     ```

4. **Open the Notebook**:
   - In the Jupyter interface, open `housing_price_prediction.ipynb`.

5. **Run the Cells**:
   - Execute the cells in the notebook "For Jupyter or Local" to preprocess the data, perform feature engineering, and train the machine learning models.

### Option 3: Running as a Python Script
1. **Install Dependencies**:
   - Ensure that all dependencies are installed by running:
     ```bash
     pip install -r requirements.txt
     ```

2. **Run the Python Script**:
   - Execute the following command to run the script:
     ```bash
     python housing_price_prediction.py
     ```

3. **Check Output**:
   - The script will preprocess the data, train the models, and output future house price predictions to the console or save results to a file (depending on the script configuration).

## Model Training Instructions
- **Preprocessing**: 
  - The project automatically handles missing values, applies feature engineering (e.g., price per square meter), and normalizes/encodes features.
  
- **Training**:
  - The models are trained using Random Forest for regression and classification tasks. The notebook contains parameters for fine-tuning and training models on the dataset.
  
- **Evaluation**:
  - After training, the models are evaluated using appropriate performance metrics (e.g., RMSE for regression).

## Prediction Guide
- Once the models are trained, you can use them to make predictions on new data.
- Example of prediction code snippet (in notebook or script):
  ```python
  future_predictions = model.predict(new_data)
  print(future_predictions)
