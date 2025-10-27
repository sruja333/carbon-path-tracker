import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Car, Home, UtensilsCrossed, Trash2, Droplet } from "lucide-react";

interface EmissionBreakdownProps {
  breakdown: {
    transportation: number;
    electricity: number;
    diet: number;
    waste: number;
    water: number;
  };
}

const COLORS = {
  transportation: "hsl(var(--primary))",
  electricity: "hsl(var(--accent))",
  diet: "hsl(var(--secondary))",
  waste: "#10b981",
  water: "#3b82f6",
};

const ICONS = {
  transportation: Car,
  electricity: Home,
  diet: UtensilsCrossed,
  waste: Trash2,
  water: Droplet,
};

export const EmissionBreakdown = ({ breakdown }: EmissionBreakdownProps) => {
  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  
  const data = Object.entries(breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
    percentage: ((value / total) * 100).toFixed(1),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            {payload[0].value.toFixed(1)} kg CO₂ ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          Emission Breakdown by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            {data.map((item) => {
              const Icon = ICONS[item.name.toLowerCase() as keyof typeof ICONS];
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded flex items-center justify-center"
                    style={{ backgroundColor: COLORS[item.name.toLowerCase() as keyof typeof COLORS] + '20' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: COLORS[item.name.toLowerCase() as keyof typeof COLORS] }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.value.toFixed(1)} kg CO₂
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
