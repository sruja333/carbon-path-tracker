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
}

export const CarbonDashboard = ({ footprint, breakdown }: CarbonDashboardProps) => {
  // Find the category with highest emissions
  const topCategory = Object.entries(breakdown).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Main Summary Card */}
      <CarbonSummaryCard footprint={footprint} />

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        <EmissionBreakdown breakdown={breakdown} />
        <Recommendations footprint={footprint} topCategory={topCategory} />
      </div>

      {/* Comparisons Full Width */}
      <Comparisons footprint={footprint} />
    </div>
  );
};
