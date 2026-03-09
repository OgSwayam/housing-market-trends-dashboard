AI-Powered Housing Market Analytics Platform

A full-stack data analytics platform that analyzes housing market trends, visualizes insights, and predicts house prices using machine learning.

This project converts a simple Tableau visualization project into a complete full-stack analytics system with a backend API, database, machine learning model, and interactive dashboards.

The system allows users to upload housing datasets, automatically process data, generate visual insights, and predict property prices using trained machine learning models.

---

Project Features

Data Upload & Processing

- Upload housing datasets in CSV format
- Automatic data cleaning and preprocessing
- Standardization of dataset columns

Interactive Analytics Dashboard

- Average house price analysis
- Price trends over time
- Bedrooms vs price distribution
- Location-based price analysis
- Dynamic filtering system

Machine Learning Prediction

- Predict house prices using ML models
- Multiple models tested:
   - Linear Regression
   - Random Forest
   - Gradient Boosting

Search & Filtering

- Filter houses by:
   - Bedrooms
   - Location (zipcode)
   - Price range
- Search housing records easily

Interactive Data Visualization

- Scatter plots
- Histograms
- Heatmaps
- Trend charts
- Tableau-style analytics dashboard

---

Tech Stack

Frontend

- React
- Vite
- Tailwind CSS
- Recharts / Chart.js

Backend

- Python
- FastAPI

Data Processing

- Pandas
- NumPy

Machine Learning

- Scikit-learn

Database

- PostgreSQL

Deployment

- Frontend → Vercel
- Backend → Render
- Database → Supabase PostgreSQL

---

System Architecture

User (Browser)
      |
      v
Frontend (React + Vite + Tailwind)
      |
      v
FastAPI Backend (Python)
      |
      v
Data Processing (Pandas / NumPy)
      |
      v
Machine Learning Models (Scikit-learn)
      |
      v
PostgreSQL Database

---

Project Structure

housing-analytics-platform
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── charts
│   │   └── api
│   └── package.json
│
├── backend
│   ├── app
│   │   ├── main.py
│   │   ├── routes
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── ml
│   └── requirements.txt
│
├── database
│   └── schema.sql
│
├── dataset
│   └── housing_data.csv
│
└── README.md

---

API Endpoints

Upload Dataset

POST /upload-dataset

Data Analytics

GET /average-price
GET /price-by-location
GET /price-by-bedroom
GET /yearly-trends

House Filtering

GET /houses?bedrooms=3&zipcode=98052

Price Prediction

POST /predict-price

Example request:

{
 "bedrooms": 3,
 "bathrooms": 2,
 "sqft_living": 2000,
 "zipcode": 98052
}

Example response:

{
 "predicted_price": 450000
}

---

Machine Learning Pipeline

1. Data preprocessing
2. Feature engineering
3. Model training
4. Model comparison
5. Best model selection
6. Model export using Pickle

Models evaluated:

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor

Evaluation Metrics:

- Mean Absolute Error (MAE)
- Mean Squared Error (MSE)
- R² Score

---

Installation

Clone Repository

git clone https://github.com/your-username/housing-analytics-platform.git

---

Backend Setup

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

---

Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

---

Deployment

Frontend deployed using Vercel

Backend deployed using Render

Database hosted on Supabase PostgreSQL

---

Future Improvements

- AI-based housing market forecasting
- Geographic heatmap visualization
- User authentication
- Saved searches
- Real estate investment insights
- Automated data pipeline

---

Use Case

This platform helps:

- Real estate analysts
- Property investors
- Data scientists
- Market researchers

understand housing market trends and predict property prices.

---

License

This project is for educational and research purposes.
