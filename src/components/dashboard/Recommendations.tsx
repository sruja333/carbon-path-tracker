import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Zap, Bus, Recycle } from "lucide-react";

interface RecommendationsProps {
  footprint: number;
  topCategory: string;
  userChoices: {
    renewableEnergy: string;
    recycle: string;
    transportMode: string;
    carpool: string;
  };
}

export const Recommendations = ({ footprint, topCategory, userChoices }: RecommendationsProps) => {
  const treesToOffset = Math.ceil(footprint / 25); // Average tree absorbs ~25kg CO₂/month
  
  const allRecommendations = [
    {
      icon: Leaf,
      title: "Plant Trees",
      description: `Plant ${treesToOffset} trees this month to offset ${footprint} kg CO₂`,
      impact: "High Impact",
      color: "text-green-600",
      bgColor: "bg-green-50",
      shouldShow: true, // Always show
    },
    {
      icon: Zap,
      title: "Switch to Renewable Energy",
      description: "Consider solar panels or green energy plans to reduce electricity emissions",
      impact: "High Impact",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      shouldShow: userChoices.renewableEnergy === "no",
    },
    {
      icon: Bus,
      title: "Use Public Transport",
      description: "Try using public transport 2-3 times a week to cut travel emissions",
      impact: "Medium Impact",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      shouldShow: userChoices.transportMode === "car" || userChoices.transportMode === "bike",
    },
    {
      icon: Recycle,
      title: "Recycle More",
      description: "Proper recycling can reduce waste emissions by up to 70%",
      impact: "Medium Impact",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      shouldShow: userChoices.recycle === "no",
    },
  ];

  // Filter recommendations based on user's current choices
  const recommendations = allRecommendations.filter(rec => rec.shouldShow);

  // Prioritize recommendation based on top category
  let priorityRecommendation = recommendations[0];
  if (topCategory === "transportation" && recommendations.find(r => r.title === "Use Public Transport")) {
    priorityRecommendation = recommendations.find(r => r.title === "Use Public Transport")!;
  } else if (topCategory === "electricity" && recommendations.find(r => r.title === "Switch to Renewable Energy")) {
    priorityRecommendation = recommendations.find(r => r.title === "Switch to Renewable Energy")!;
  } else if (topCategory === "waste" && recommendations.find(r => r.title === "Recycle More")) {
    priorityRecommendation = recommendations.find(r => r.title === "Recycle More")!;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Priority recommendation */}
          <div className={`p-4 rounded-lg border-2 ${priorityRecommendation.bgColor} border-current`}>
            <div className="flex items-start gap-3">
              <priorityRecommendation.icon className={`w-6 h-6 ${priorityRecommendation.color} flex-shrink-0 mt-1`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{priorityRecommendation.title}</h4>
                  <Badge variant="secondary" className="text-xs">Top Priority</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{priorityRecommendation.description}</p>
                <Badge className={priorityRecommendation.color}>{priorityRecommendation.impact}</Badge>
              </div>
            </div>
          </div>

          {/* Other recommendations */}
          {recommendations
            .filter(r => r.title !== priorityRecommendation.title)
            .map((rec, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors">
                <div className="flex items-start gap-3">
                  <rec.icon className={`w-5 h-5 ${rec.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{rec.description}</p>
                    <Badge variant="outline" className="text-xs">{rec.impact}</Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
