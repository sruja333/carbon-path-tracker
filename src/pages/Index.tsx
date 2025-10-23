import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Home, UtensilsCrossed, Trash2, ShoppingBag, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-earth.jpg";
import vineLeft from "@/assets/vine-left.png";
import vineRight from "@/assets/vine-right.png";

const Index = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  // Travel state
  const [travelKmPerDay, setTravelKmPerDay] = useState(25);
  const [transportMode, setTransportMode] = useState("car");
  const [carpool, setCarpool] = useState("no");

  // Home state
  const [electricityUnits, setElectricityUnits] = useState(300);
  const [acUsage, setAcUsage] = useState("occasionally");
  const [renewableEnergy, setRenewableEnergy] = useState("no");

  // Food state
  const [meatMealsPerWeek, setMeatMealsPerWeek] = useState(7);
  const [dairyLitersPerDay, setDairyLitersPerDay] = useState(0.5);
  const [localFood, setLocalFood] = useState("no");

  // Waste state
  const [wasteKgPerWeek, setWasteKgPerWeek] = useState(10);
  const [recycle, setRecycle] = useState("no");
  const [waterUsageLiters, setWaterUsageLiters] = useState(200);

  // Lifestyle state
  const [shoppingFreq, setShoppingFreq] = useState(3);
  const [onlineOrders, setOnlineOrders] = useState(5);

  const calculateFootprint = () => {
    setIsCalculating(true);
    
    // Calculations based on global standards (IPCC, EPA, DEFRA, FAO)
    let total = 0;
    
    // TRANSPORTATION - Based on DEFRA 2024 UK Government GHG Conversion Factors
    // Source: https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2024
    const transportFactors: { [key: string]: number } = {
      car: 0.171,        // Average petrol car (kg CO2e per km)
      bike: 0.103,       // Motorbike/scooter (kg CO2e per km)
      bus: 0.103,        // Average local bus (kg CO2e per km per passenger)
      metro: 0.031,      // National rail/metro (kg CO2e per km per passenger)
      bicycle: 0,        // Zero emissions
      walk: 0            // Zero emissions
    };
    // Carpooling reduces emissions by ~50% (sharing with 1 other person)
    const carpoolMultiplier = carpool === "yes" ? 0.5 : 1;
    total += travelKmPerDay * 30 * transportFactors[transportMode] * carpoolMultiplier;

    // ELECTRICITY - Based on EPA eGRID 2024 (US National Average) & IEA 2024
    // Source: https://www.epa.gov/egrid & https://www.iea.org
    // Global average: 0.475 kg CO2/kWh, US average: 0.373 kg CO2/kWh
    // Using 0.42 kg CO2/kWh as balanced global estimate
    const electricityFactor = 0.42; // kg CO2 per kWh (global average)
    total += electricityUnits * electricityFactor;
    
    // Air conditioning adds significant energy consumption
    // Average AC: 1.5-3 kW × hours of use
    if (acUsage === "daily") total += 150 * electricityFactor;      // ~150 kWh/month extra
    if (acUsage === "occasionally") total += 50 * electricityFactor; // ~50 kWh/month extra
    
    // Renewable energy reduces grid carbon intensity by ~70%
    if (renewableEnergy === "yes") total *= 0.3; // Only 30% of grid emissions

    // FOOD & DIET - Based on Our World in Data / FAO Global LCA Studies
    // Source: https://ourworldindata.org/environmental-impacts-of-food
    // Emission factors per kg of food product (kg CO2e per kg):
    // Beef: 27, Lamb: 24, Pork: 7.6, Chicken: 6.9, Fish: 6.1
    // Using weighted average for "non-veg meal" = 12 kg CO2e per kg (mixed meat meal)
    // Average meal portion: 0.2 kg meat per meal
    const meatEmissionPerMeal = 12 * 0.2; // 2.4 kg CO2e per meal
    total += meatMealsPerWeek * 4 * meatEmissionPerMeal;
    
    // Dairy milk: 1.9 kg CO2e per liter (FAO data)
    const dairyEmissionPerLiter = 1.9;
    total += dairyLitersPerDay * 30 * dairyEmissionPerLiter;
    
    // Local/seasonal food reduces transport emissions by ~10-15%
    if (localFood === "yes") total *= 0.88; // 12% reduction

    // WASTE & WATER - Based on IPCC Waste Guidelines 2006
    // Source: https://www.ipcc-nggip.iges.or.jp/public/2006gl/vol5.html
    // Landfill waste: ~0.5-1.0 kg CO2e per kg (methane emissions)
    const wasteEmissionFactor = 0.7; // kg CO2e per kg waste (average)
    total += wasteKgPerWeek * 4 * wasteEmissionFactor;
    
    // Recycling prevents ~70% of waste emissions
    if (recycle === "yes") total *= 0.3; // Only 30% goes to landfill
    
    // Water treatment & heating: ~0.0003 kg CO2 per liter (negligible but included)
    total += waterUsageLiters * 0.0003 * 30; // Monthly water usage

    // LIFESTYLE & CONSUMPTION - Based on textile industry & logistics data
    // New clothing: ~20 kg CO2e per item (production + transport average)
    // Online delivery: ~0.5-2 kg CO2e per package (last-mile logistics)
    total += shoppingFreq * 20;     // Clothing production footprint
    total += onlineOrders * 1.5;    // Delivery logistics footprint

    setTimeout(() => {
      setCarbonFootprint(Math.round(total));
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Decorative Vines */}
      <img 
        src={vineLeft} 
        alt="" 
        className="fixed left-0 top-0 h-full w-auto opacity-20 pointer-events-none z-0"
        style={{ maxWidth: '150px' }}
      />
      <img 
        src={vineRight} 
        alt="" 
        className="fixed right-0 top-0 h-full w-auto opacity-20 pointer-events-none z-0"
        style={{ maxWidth: '150px' }}
      />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/60 to-background" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
          <Leaf className="w-16 h-16 text-accent mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
            Carbon Footprint Tracker
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black max-w-2xl">
            Measure your environmental impact and discover ways to live more sustainably
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        <div className="space-y-8">
          {/* Travel Section */}
          <Card className="p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Car className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Travel & Transportation</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How many km do you travel per day (average)?
                </label>
                <Slider
                  value={[travelKmPerDay]}
                  onValueChange={(val) => setTravelKmPerDay(val[0])}
                  max={100}
                  step={5}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{travelKmPerDay} km/day</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  What's your main mode of transport?
                </label>
                <Select value={transportMode} onValueChange={setTransportMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">🚗 Car</SelectItem>
                    <SelectItem value="bike">🏍️ Bike</SelectItem>
                    <SelectItem value="bus">🚌 Bus</SelectItem>
                    <SelectItem value="metro">🚇 Metro</SelectItem>
                    <SelectItem value="bicycle">🚴 Bicycle</SelectItem>
                    <SelectItem value="walk">🚶 Walk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you usually carpool or drive alone?
                </label>
                <Select value={carpool} onValueChange={setCarpool}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I carpool</SelectItem>
                    <SelectItem value="no">No, I drive alone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Home Energy Section */}
          <Card className="p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Home Energy Usage</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How many electricity units do you use per month?
                  <span className="text-xs text-muted-foreground ml-2">(Find units in your latest electricity bill)</span>
                </label>
                <Slider
                  value={[electricityUnits]}
                  onValueChange={(val) => setElectricityUnits(val[0])}
                  max={1000}
                  step={50}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{electricityUnits} units/month</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you use air conditioning?
                </label>
                <Select value={acUsage} onValueChange={setAcUsage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="occasionally">Occasionally</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you use renewable energy (solar, etc.)?
                </label>
                <Select value={renewableEnergy} onValueChange={setRenewableEnergy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Food Section */}
          <Card className="p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Food & Diet Habits</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How many non-vegetarian meals do you eat per week?
                </label>
                <Slider
                  value={[meatMealsPerWeek]}
                  onValueChange={(val) => setMeatMealsPerWeek(val[0])}
                  max={21}
                  step={1}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{meatMealsPerWeek} meals/week</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How much dairy do you consume per day?
                </label>
                <Slider
                  value={[dairyLitersPerDay]}
                  onValueChange={(val) => setDairyLitersPerDay(val[0])}
                  max={2}
                  step={0.1}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{dairyLitersPerDay.toFixed(1)} liters/day</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you prefer local/seasonal food?
                </label>
                <Select value={localFood} onValueChange={setLocalFood}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Waste Section */}
          <Card className="p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Waste & Water</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How many kg of waste do you generate weekly?
                </label>
                <Slider
                  value={[wasteKgPerWeek]}
                  onValueChange={(val) => setWasteKgPerWeek(val[0])}
                  max={30}
                  step={1}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{wasteKgPerWeek} kg/week</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you recycle regularly?
                </label>
                <Select value={recycle} onValueChange={setRecycle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How much water do you use daily (approx.)?
                </label>
                <Slider
                  value={[waterUsageLiters]}
                  onValueChange={(val) => setWaterUsageLiters(val[0])}
                  max={1000}
                  step={20}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{waterUsageLiters} liters/day</span>
              </div>
            </div>
          </Card>

          {/* Lifestyle Section */}
          <Card className="p-8 shadow-lg animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Lifestyle Extras</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  How often do you shop for new clothes per month?
                </label>
                <Slider
                  value={[shoppingFreq]}
                  onValueChange={(val) => setShoppingFreq(val[0])}
                  max={10}
                  step={1}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{shoppingFreq} times/month</span>
              </div>
              <div>
                <label className="block text-sm font-medium mb-3 text-foreground">
                  Do you frequently order online?
                </label>
                <Slider
                  value={[onlineOrders]}
                  onValueChange={(val) => setOnlineOrders(val[0])}
                  max={20}
                  step={1}
                  className="mb-2"
                />
                <span className="text-sm text-muted-foreground">{onlineOrders} orders/month</span>
              </div>
            </div>
          </Card>

          {/* Calculate Button */}
          <div className="flex justify-center pt-8 animate-fade-in">
            <Button 
              size="lg"
              onClick={calculateFootprint}
              disabled={isCalculating}
              className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isCalculating ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Calculating...
                </span>
              ) : (
                "Calculate My Footprint 🌍"
              )}
            </Button>
          </div>

          {/* Results Section */}
          {showResults && (
            <Card className="p-10 shadow-xl bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20 animate-scale-in">
              <div className="text-center">
                <Leaf className="w-16 h-16 text-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Your Carbon Footprint</h3>
                <div className="text-6xl font-bold text-primary my-6">
                  {carbonFootprint} kg CO₂
                </div>
                <p className="text-lg text-muted-foreground mb-4">per month</p>
                <div className="bg-muted/50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-foreground">
                    {carbonFootprint < 300 ? (
                      "🌟 Great job! You're below average. Keep up the sustainable lifestyle!"
                    ) : carbonFootprint < 500 ? (
                      "👍 You're doing okay! There's room for improvement to reduce your footprint."
                    ) : (
                      "🌍 Your footprint is above average. Consider making some eco-friendly changes!"
                    )}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Motivational Footer */}
      <footer className="relative z-10 mt-16 py-16 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Leaf className="w-12 h-12 text-accent mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-primary-foreground mb-4">
              Together, we can make a difference for our planet 🌱
            </h3>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Small changes in your daily habits can create a massive impact on our environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 bg-card/95 backdrop-blur animate-fade-in hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🚴</div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Choose Green Transport</h4>
              <p className="text-sm text-muted-foreground">
                Walking, cycling, or using public transport can reduce your carbon footprint by up to 2 tons per year
              </p>
            </Card>
            
            <Card className="p-6 bg-card/95 backdrop-blur animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-3">🌿</div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Eat More Plants</h4>
              <p className="text-sm text-muted-foreground">
                Reducing meat consumption by half can save 500kg of CO₂ emissions annually
              </p>
            </Card>
            
            <Card className="p-6 bg-card/95 backdrop-blur animate-fade-in hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-3">♻️</div>
              <h4 className="font-bold text-lg mb-2 text-foreground">Reduce & Recycle</h4>
              <p className="text-sm text-muted-foreground">
                Recycling and composting can divert 75% of waste from landfills and reduce emissions
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-primary-foreground/80 text-sm">
              Every action counts. Start your sustainable journey today! 🌍
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
