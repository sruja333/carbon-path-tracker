import { CarbonSummaryCard } from "./CarbonSummaryCard";
import { EmissionBreakdown } from "./EmissionBreakdown";
import { Recommendations } from "./Recommendations";
import { Comparisons } from "./Comparisons";

interface CarbonDashboardProps {
  footprint: number;
  breakdown: {
    transportation: number;
    electricity: number;
    diet: number;
    waste: number;
    water: number;
  };
  userChoices: {
    renewableEnergy: string;
    recycle: string;
    transportMode: string;
    carpool: string;
  };
}

export const CarbonDashboard = ({ footprint, breakdown, userChoices }: CarbonDashboardProps) => {
  // Find the category with highest emissions
  const topCategory = Object.entries(breakdown).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Summary Card */}
      <CarbonSummaryCard footprint={footprint} />

      {/* Emission Breakdown */}
      <EmissionBreakdown breakdown={breakdown} />
      
      {/* Recommendations */}
      <Recommendations footprint={footprint} topCategory={topCategory} userChoices={userChoices} />

      {/* Comparisons */}
      <Comparisons footprint={footprint} />
    </div>
  );
};
