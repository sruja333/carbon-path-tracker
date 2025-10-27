import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp } from "lucide-react";

interface CarbonSummaryCardProps {
  footprint: number;
  averageFootprint?: number;
}

export const CarbonSummaryCard = ({ footprint, averageFootprint = 400 }: CarbonSummaryCardProps) => {
  const percentageDiff = ((footprint - averageFootprint) / averageFootprint) * 100;
  const isBelowAverage = percentageDiff < 0;
  const progressValue = Math.min((footprint / (averageFootprint * 1.5)) * 100, 100);

  return (
    <Card className="p-8 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="text-center space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Your Monthly Carbon Footprint
          </h3>
          <div className="text-6xl font-bold text-primary my-4">
            {footprint}
            <span className="text-2xl ml-2">kg CO₂</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-lg">
            {isBelowAverage ? (
              <>
                <TrendingDown className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-green-600">
                  {Math.abs(percentageDiff).toFixed(1)}% below average
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-6 h-6 text-orange-600" />
                <span className="font-semibold text-orange-600">
                  {percentageDiff.toFixed(1)}% above average
                </span>
              </>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Your footprint</span>
              <span>Average ({averageFootprint} kg)</span>
            </div>
            <Progress value={progressValue} className="h-3" />
          </div>

          <p className="text-sm text-muted-foreground pt-2">
            {isBelowAverage ? (
              <>🌟 Great job! You're doing better than the average user this month.</>
            ) : (
              <>🌍 There's room to reduce your carbon footprint. Check out the recommendations below!</>
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};
