"""
Train a Random Forest model for carbon footprint prediction
Based on lifestyle and consumption patterns
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle

# Generate synthetic training data based on real emission factors
np.random.seed(42)
n_samples = 5000

# Generate feature data
data = {
    'travelKmPerDay': np.random.uniform(0, 100, n_samples),
    'transportMode': np.random.choice(['car', 'bus', 'metro', 'bike'], n_samples),
    'carpool': np.random.choice(['yes', 'no'], n_samples),
    'electricityUnits': np.random.uniform(0, 1000, n_samples),
    'acUsage': np.random.choice(['none', 'low', 'medium', 'high'], n_samples),
    'renewableEnergy': np.random.choice(['yes', 'no'], n_samples),
    'meatMealsPerWeek': np.random.uniform(0, 21, n_samples),
    'dairyLitersPerDay': np.random.uniform(0, 3, n_samples),
    'localFood': np.random.choice(['yes', 'no'], n_samples),
    'wasteKgPerWeek': np.random.uniform(0, 50, n_samples),
    'recycle': np.random.choice(['yes', 'no'], n_samples),
    'waterUsageLiters': np.random.uniform(50, 500, n_samples),
    'shoppingFreq': np.random.uniform(0, 20, n_samples),
    'onlineOrders': np.random.uniform(0, 30, n_samples),
}

df = pd.DataFrame(data)

# Calculate target based on scientifically validated emission factors
def calculate_footprint(row):
    # Transportation (kg CO2e per day -> monthly)
    transport_factors = {'car': 0.171, 'bus': 0.103, 'metro': 0.031, 'bike': 0}
    transport = row['travelKmPerDay'] * transport_factors[row['transportMode']] * 30
    if row['carpool'] == 'yes':
        transport *= 0.5
    
    # Electricity (kg CO2 per month)
    electricity = row['electricityUnits'] * 0.42
    ac_additions = {'none': 0, 'low': 50, 'medium': 100, 'high': 150}
    electricity += ac_additions[row['acUsage']] * 0.42
    if row['renewableEnergy'] == 'yes':
        electricity *= 0.3
    
    # Food (kg CO2e per month)
    meat = (row['meatMealsPerWeek'] / 7) * 30 * 2.4  # 2.4 kg per meal
    dairy = row['dairyLitersPerDay'] * 30 * 1.9  # 1.9 kg per liter
    food = meat + dairy
    if row['localFood'] == 'yes':
        food *= 0.88
    
    # Waste (kg CO2e per month)
    waste = (row['wasteKgPerWeek'] / 7) * 30 * 0.7
    if row['recycle'] == 'yes':
        waste *= 0.3
    
    # Water (kg CO2 per month)
    water = row['waterUsageLiters'] * 30 * 0.0003
    
    # Shopping (kg CO2e per month)
    shopping = row['shoppingFreq'] * 20 + row['onlineOrders'] * 1.5
    
    total = transport + electricity + food + waste + water + shopping
    
    # Add some realistic noise
    noise = np.random.normal(0, total * 0.05)
    return max(0, total + noise)

df['footprint'] = df.apply(calculate_footprint, axis=1)

# Encode categorical variables
label_encoders = {}
categorical_cols = ['transportMode', 'carpool', 'acUsage', 'renewableEnergy', 'localFood', 'recycle']

for col in categorical_cols:
    le = LabelEncoder()
    df[col + '_encoded'] = le.fit_transform(df[col])
    label_encoders[col] = le

# Prepare features for training
feature_cols = [
    'travelKmPerDay', 'transportMode_encoded', 'carpool_encoded',
    'electricityUnits', 'acUsage_encoded', 'renewableEnergy_encoded',
    'meatMealsPerWeek', 'dairyLitersPerDay', 'localFood_encoded',
    'wasteKgPerWeek', 'recycle_encoded', 'waterUsageLiters',
    'shoppingFreq', 'onlineOrders'
]

X = df[feature_cols]
y = df['footprint']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest model
print("Training Random Forest model...")
model = RandomForestRegressor(
    n_estimators=100,
    max_depth=20,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# Evaluate
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
print(f"Training R² Score: {train_score:.4f}")
print(f"Testing R² Score: {test_score:.4f}")

# Save model and encoders
print("Saving model...")
with open('model/footprint_model.pkl', 'wb') as f:
    pickle.dump({
        'model': model,
        'label_encoders': label_encoders,
        'feature_cols': feature_cols
    }, f)

print("Model training complete!")
print(f"Model saved to: model/footprint_model.pkl")
