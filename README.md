AI-Powered Housing Market Analytics Platform

This project is a full-stack housing market analytics system that analyzes housing data, visualizes important market trends, and predicts house prices using machine learning.

Originally, the idea came from a Tableau-based visualization project titled “Visualizing Housing Market Trends: Analysis of Sale Prices and Features.”
Instead of keeping it as a static visualization report, this project converts it into a complete web application that includes a backend API, database, machine learning model, and an interactive dashboard.

The platform allows users to upload housing datasets, explore different housing features through charts, and estimate house prices using predictive models.

---

Project Objectives

The main objectives of this project are:

- To analyze housing market data and identify patterns in property prices
- To visualize relationships between different housing features
- To build an interactive dashboard for exploring housing trends
- To implement machine learning models for house price prediction

---

Key Features

Dataset Upload

Users can upload a housing dataset in CSV format.
The system automatically processes the dataset and prepares it for analysis.

Data Processing

The uploaded data is cleaned and standardized using Python data analysis libraries.

Interactive Dashboard

The dashboard provides visual insights such as:

- Average house price
- Price trends over time
- Bedrooms vs price comparison
- Location-based price analysis

House Search and Filtering

Users can filter housing records based on features such as:

- Number of bedrooms
- Bathrooms
- Zipcode
- Price range

Price Prediction

The system uses machine learning models to predict house prices based on input features.

---

Technology Stack

Frontend

- React
- Vite
- Tailwind CSS
- Recharts / Chart.js

Backend

- Python FastAPI

Data Processing

- Pandas
- NumPy

Machine Learning

- Scikit-learn

Database

- PostgreSQL

Deployment

- Frontend: Vercel
- Backend: Render
- Database: Supabase PostgreSQL

---

System Architecture

User
  │
  ▼
Frontend (React + Tailwind)
  │
  ▼
Backend API (FastAPI)
  │
  ├── Data Processing (Pandas / NumPy)
  ├── Machine Learning Model
  │
  ▼
PostgreSQL Database

---

Project Folder Structure

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

Housing Data Analytics

GET /average-price
GET /price-by-location
GET /price-by-bedroom
GET /yearly-trends

Filter Houses

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

Machine Learning Approach

The system trains different machine learning models to predict housing prices.

Models Used

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor

Model Evaluation Metrics

- Mean Absolute Error (MAE)
- Mean Squared Error (MSE)
- R² Score

The model with the best performance is selected and used for prediction.

---

Installation

Clone the Repository

git clone https://github.com/your-username/housing-analytics-platform.git

---

Backend Setup

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs on:

http://localhost:8000

---

Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

---

Deployment

The application can be deployed using the following platforms:

Frontend → Vercel
Backend → Render
Database → Supabase PostgreSQL

---

Future Improvements

Some features that can be added in the future:

- Geographic heatmap visualization
- User authentication system
- Market trend forecasting
- Saved searches and recommendations
- Automated data pipeline

---

Use Cases

This platform can be useful for:

- Real estate analysts
- Property investors
- Data science students
- Researchers studying housing markets

---

License

This project is created for educational and research purposes.
