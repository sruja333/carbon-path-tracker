from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    # Simple placeholder calculation
    footprint = (
        data.travelKmPerDay * 0.3 +
        data.electricityUnits * 0.4 +
        data.meatMealsPerWeek * 2 +
        data.wasteKgPerWeek * 1.5 +
        data.onlineOrders * 0.7
    )

    # Adjust for some lifestyle factors
    if data.carpool == "yes":
        footprint *= 0.9
    if data.renewableEnergy == "yes":
        footprint *= 0.85
    if data.recycle == "yes":
        footprint *= 0.8

    return {"footprint": round(footprint, 2)}

