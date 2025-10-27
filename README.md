# Carbon Footprint Tracker

An ML-powered carbon footprint calculator that helps individuals track and understand their environmental impact.

**Project URL**: https://lovable.dev/projects/10f9a78b-6890-498b-9283-634aeee1a1f5

## Features

- **ML-Based Predictions**: Uses Random Forest regression trained on scientifically validated emission factors
- **Comprehensive Tracking**: Monitors transportation, energy, food, waste, and lifestyle emissions
- **Real-time Calculations**: Instant feedback on your carbon footprint
- **Beautiful UI**: Modern, responsive design with smooth animations

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Backend**: FastAPI (Python)
- **ML Model**: scikit-learn Random Forest Regressor
- **Data**: Based on EPA, DEFRA, IPCC emission standards

## Setup

### Backend

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Train the ML model (first time only):
```bash
python train_model.py
```

3. Start the API server:
```bash
uvicorn app:app --reload
```

The API will be available at `http://127.0.0.1:8000`

### Frontend

1. Clone and install:
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm i
npm run dev
```

## ML Model

The Random Forest model is trained on synthetic data generated using scientifically validated emission factors:

- **Transportation**: EPA emission factors (kg CO2e per km)
- **Electricity**: Global average (0.42 kg CO2 per kWh)
- **Food**: FAO and EPA data (meat, dairy emissions)
- **Waste**: DEFRA waste emission factors
- **Water**: Treatment and distribution emissions

### Model Performance
- Training R² Score: ~0.999
- Testing R² Score: ~0.999

## API Endpoints

### POST /predict

Calculates carbon footprint based on user inputs.

**Request Body:**
```json
{
  "travelKmPerDay": 20,
  "transportMode": "car",
  "carpool": "no",
  "electricityUnits": 300,
  "acUsage": "medium",
  "renewableEnergy": "no",
  "meatMealsPerWeek": 7,
  "dairyLitersPerDay": 0.5,
  "localFood": "yes",
  "wasteKgPerWeek": 10,
  "recycle": "yes",
  "waterUsageLiters": 150,
  "shoppingFreq": 5,
  "onlineOrders": 3
}
```

**Response:**
```json
{
  "footprint": 287.45
}
```

## Environmental Impact Categories

1. **Transportation**: Vehicle type, distance, carpooling
2. **Home Energy**: Electricity usage, AC, renewable energy
3. **Food**: Meat consumption, dairy, local food choices
4. **Waste**: Amount, recycling habits
5. **Water**: Daily consumption
6. **Lifestyle**: Shopping frequency, online orders

## Deployment

Simply open [Lovable](https://lovable.dev/projects/10f9a78b-6890-498b-9283-634aeee1a1f5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
