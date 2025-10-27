from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
from pathlib import Path

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained ML model
model_path = Path("model/footprint_model.pkl")
try:
    with open(model_path, 'rb') as f:
        model_data = pickle.load(f)
        ml_model = model_data['model']
        label_encoders = model_data['label_encoders']
        feature_cols = model_data['feature_cols']
    print("✓ ML model loaded successfully")
except Exception as e:
    print(f"⚠ Warning: Could not load ML model: {e}")
    ml_model = None

# Define input schema (match frontend)
class InputData(BaseModel):
    travelKmPerDay: float
    transportMode: str
    carpool: str
    electricityUnits: float
    acUsage: str
    renewableEnergy: str
    meatMealsPerWeek: float
    dairyLitersPerDay: float
    localFood: str
    wasteKgPerWeek: float
    recycle: str
    waterUsageLiters: float
    shoppingFreq: float
    onlineOrders: float

@app.post("/predict")
def predict(data: InputData):
    if ml_model is None:
        raise HTTPException(status_code=500, detail="ML model not loaded. Please train the model first.")
    
    try:
        # Prepare input features
        input_dict = {
            'travelKmPerDay': data.travelKmPerDay,
            'transportMode_encoded': label_encoders['transportMode'].transform([data.transportMode])[0],
            'carpool_encoded': label_encoders['carpool'].transform([data.carpool])[0],
            'electricityUnits': data.electricityUnits,
            'acUsage_encoded': label_encoders['acUsage'].transform([data.acUsage])[0],
            'renewableEnergy_encoded': label_encoders['renewableEnergy'].transform([data.renewableEnergy])[0],
            'meatMealsPerWeek': data.meatMealsPerWeek,
            'dairyLitersPerDay': data.dairyLitersPerDay,
            'localFood_encoded': label_encoders['localFood'].transform([data.localFood])[0],
            'wasteKgPerWeek': data.wasteKgPerWeek,
            'recycle_encoded': label_encoders['recycle'].transform([data.recycle])[0],
            'waterUsageLiters': data.waterUsageLiters,
            'shoppingFreq': data.shoppingFreq,
            'onlineOrders': data.onlineOrders,
        }
        
        # Create feature array in correct order
        X = np.array([[input_dict[col] for col in feature_cols]])
        
        # Make prediction
        footprint = ml_model.predict(X)[0]
        
        return {"footprint": round(max(0, footprint), 2)}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

