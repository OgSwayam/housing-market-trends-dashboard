🏠 AI-Powered Housing Market Analytics Platform

A full-stack web application that analyzes housing market data, visualizes price trends, and predicts house prices using machine learning.

This project started as a Tableau data visualization project, but it has been extended into a complete software system with a backend API, database, ML model, and interactive dashboard.

---

📌 Project Goal

The goal of this project is to build a platform that can:

• Analyze housing market data
• Visualize important trends in property prices
• Allow users to explore housing features interactively
• Predict house prices using machine learning

---

✨ Main Features

📂 Dataset Upload

Users can upload a housing dataset in CSV format.
The system automatically cleans and processes the data.

📊 Interactive Dashboard

The dashboard provides visual insights such as:

- Average house prices
- Housing price trends
- Bedrooms vs price comparison
- Location-based analysis

🔎 House Search & Filtering

Users can filter housing records based on:

- Bedrooms
- Bathrooms
- Zipcode
- Price range

🤖 Price Prediction

Machine learning models are used to estimate house prices based on selected features.

---

🛠 Technology Stack

Layer| Technology
Frontend| React + Vite
Styling| Tailwind CSS
Charts| Recharts / Chart.js
Backend| FastAPI
Data Processing| Pandas, NumPy
Machine Learning| Scikit-learn
Database| PostgreSQL

---

🏗 System Architecture

User (Browser)
     │
     ▼
Frontend (React + Tailwind)
     │
     ▼
FastAPI Backend
     │
     ├── Data Processing (Pandas / NumPy)
     ├── Machine Learning Model
     │
     ▼
PostgreSQL Database

---

📁 Project Structure

housing-analytics-platform
│

├── frontend

│   ├── src

│   │   ├── components

│   │   ├── pages

│   │   ├── charts

│   │   └── api

│

├── backend

│   ├── app

│   │   ├── routes

│   │   ├── models

│   │   ├── schemas

│   │   └── ml

│
├── database

│   └── schema.sql

│

└── README.md

---

🔌 API Endpoints

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

Example request

{
 "bedrooms": 3,
 "bathrooms": 2,
 "sqft_living": 2000,
 "zipcode": 98052
}

Example response

{
 "predicted_price": 450000
}

---

🤖 Machine Learning Approach

The system trains multiple models to predict housing prices.

Models used:

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor

Evaluation metrics:

- MAE
- MSE
- R² Score

The model with the best performance is used for prediction.

---

⚙ Installation

Clone the Repository

git clone https://github.com/your-username/housing-analytics-platform.git

Backend Setup

cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:

http://localhost:8000

Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

---

🚀 Deployment

Service| Platform
Frontend| Vercel
Backend| Render
Database| Supabase

---

🔮 Future Improvements

- Geographic housing price heatmaps
- User login system
- Housing market forecasting
- Saved searches
- Automated data pipelines

---

📚 License

This project is created for educational purposes.
