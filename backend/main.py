import os
import pickle
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Bitcoin Sentiment Trading API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'trading_sentiment_model.pkl')

try:
    with open(MODEL_PATH, 'rb') as f:
        artifact = pickle.load(f)
        model = artifact['model']
        le_coin = artifact['label_encoder_coin']
        features = artifact['features']
        print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    le_coin = None
    features = None

# Input format for Prediction
class TradeInput(BaseModel):
    fg_value: float
    direction: str
    side: str
    size_usd: float
    fee: float
    exec_price: float
    start_pos: float
    crossed: bool
    coin: str
    fg_3d_avg: Optional[float] = None
    fg_momentum: Optional[float] = 0.0
    day_of_week: Optional[int] = 0
    month: Optional[int] = 1

@app.post("/api/predict")
def predict_trade(data: TradeInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded.")
    
    fg_value = data.fg_value
    direction = data.direction
    side = data.side
    size_usd = data.size_usd
    fee = data.fee
    exec_price = data.exec_price
    start_pos = data.start_pos
    crossed = data.crossed
    coin = data.coin
    fg_3d_avg = data.fg_3d_avg if data.fg_3d_avg is not None else fg_value
    fg_momentum = data.fg_momentum
    day_of_week = data.day_of_week
    month = data.month

    # Logic from Notebook
    if fg_value <= 25: fg_class = 0
    elif fg_value <= 45: fg_class = 1
    elif fg_value <= 55: fg_class = 2
    elif fg_value <= 75: fg_class = 3
    else: fg_class = 4

    dir_map = {'Open Long':0,'Close Long':1,'Open Short':2,'Close Short':3,'Buy':4,'Sell':5}
    is_long = 1 if direction == 'Open Long' else 0
    is_short = 1 if direction == 'Open Short' else 0
    contrarian = int((fg_class <= 1 and is_long) or (fg_class >= 3 and is_short))

    coin_clean = coin if coin in le_coin.classes_ else 'OTHER'
    coin_enc = le_coin.transform([coin_clean])[0]

    row_dict = {
        'fg_value': fg_value,
        'fg_class_enc': fg_class,
        'fg_3d_avg': fg_3d_avg,
        'fg_momentum': fg_momentum,
        'side_enc': 1 if side == 'BUY' else 0,
        'direction_enc': dir_map.get(direction, 6),
        'log_size_usd': np.log1p(abs(size_usd)),
        'log_fee': np.log1p(abs(fee)),
        'exec_price': exec_price,
        'start_pos': start_pos,
        'crossed': int(crossed),
        'is_long': is_long,
        'is_short': is_short,
        'contrarian': contrarian,
        'coin_enc': coin_enc,
        'day_of_week': day_of_week,
        'month': month
    }
    
    row = pd.DataFrame([row_dict])
    
    # Predict Probability
    try:
        proba = model.predict_proba(row[features])[0][1]
        return {
            "win_probability": round(proba, 4),
            "prediction": "WIN" if proba > 0.5 else "LOSS"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/insights")
def get_insights():
    return {
        "status": "success",
        "message": "Connected to ML backend"
    }

# Mount static files to serve the generated charts 
# (Charts are in the project root)
app.mount("/images", StaticFiles(directory=BASE_DIR), name="images")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
