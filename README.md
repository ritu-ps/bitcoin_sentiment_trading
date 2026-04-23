# Bitcoin Sentiment Trading Dashboard

A full-stack web application that leverages machine learning to predict the outcome of Bitcoin trades based on market sentiment and historical trading data. The project provides an interactive dashboard to visualize model performance, understand feature importance, and make live predictions using an AI model.

## Features

- **AI Predictor**: Input trade parameters (Fear & Greed index, direction, size, coin, etc.) to get a real-time win/loss probability prediction.
- **Model Analytics**: Visualize the underlying machine learning model's performance, including sentiment accuracy, SHAP values, and feature importance.
- **Modern UI**: A responsive, dynamic, and aesthetic frontend built with React and Vite.
- **Robust Backend**: A fast and scalable FastAPI backend to serve the machine learning model.

## Tech Stack

- **Frontend**: React, Vite, CSS.
- **Backend**: Python, FastAPI, Uvicorn, Pandas, Numpy.
- **Machine Learning**: Scikit-Learn (predictive model trained on historical trade and sentiment data).

## Project Structure

```text
bitcoin_sentiment_trading/
├── backend/                    # FastAPI server and ML model integration
│   ├── main.py                 # API endpoints
│   └── requirements.txt        # Python dependencies
├── frontend/                   # Vite + React application
│   ├── src/                    # React components, styles, and assets
│   ├── package.json            # Node dependencies
│   └── vite.config.js          # Vite configuration
├── trading_sentiment_model.pkl # Pre-trained Machine Learning model
└── ...                         # Jupyter notebooks, datasets, and generated plots
```

## Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js (v16+)

### 1. Backend Setup

Navigate to the `backend` directory and set up a virtual environment:

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Run the backend server:

```bash
# Wait to start from root or backend directory. 
# Depending on how paths are referenced, you might need to run it from backend:
python main.py
# OR
uvicorn main:app --reload

# The API will be available at http://127.0.0.1:8000
```

### 2. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
# The frontend will be available at http://localhost:5173
```

## Usage

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:5173`.
3. Use the **Dashboard** to explore data, the **Model Analytics** to understand how the ML model makes decisions, and the **AI Predictor** to test trade configurations.

## License

This project is open-source and available under the MIT License.
