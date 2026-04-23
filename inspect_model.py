import pickle
import sys
import sklearn
import lightgbm
import xgboost

with open('trading_sentiment_model.pkl', 'rb') as f:
    artifact = pickle.load(f)

print("Best model name:", artifact.get('best_model_name'))
print("Features:", artifact.get('features'))
