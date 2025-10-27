import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ComparisonsProps {
  footprint: number;
}

export const Comparisons = ({ footprint }: ComparisonsProps) => {
  const benchmarks = [
    {
      label: "Global Average",
      value: 450,
      emoji: "🌍",
    },
    {
      label: "Country Average (India)",
      value: 320,
      emoji: "🇮🇳",
    },
    {
      label: "Eco-Conscious Users",
      value: 250,
      emoji: "🌱",
    },
    {
      label: "Carbon Neutral Goal",
      value: 150,
      emoji: "🎯",
    },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          How You Compare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {benchmarks.map((benchmark, index) => {
            const percentage = (footprint / benchmark.value) * 100;
            const isBetter = footprint < benchmark.value;
            const diff = Math.abs(footprint - benchmark.value);
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{benchmark.emoji}</span>
                    <span className="font-medium">{benchmark.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">
                      {benchmark.value} kg CO₂
                    </div>
                    <div className={`text-xs ${isBetter ? 'text-green-600' : 'text-orange-600'}`}>
                      {isBetter ? `${diff.toFixed(0)} kg less` : `${diff.toFixed(0)} kg more`}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
                  {footprint > benchmark.value && percentage > 100 && (
                    <div 
                      className="absolute top-0 h-2 bg-orange-500 rounded-r-full opacity-50"
                      style={{ 
                        left: '100%', 
                        width: `${Math.min((percentage - 100), 50)}%` 
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              💪 Keep working towards the carbon neutral goal of 150 kg CO₂ per month!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
