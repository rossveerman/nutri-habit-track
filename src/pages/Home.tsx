
import React from "react";
import { useNutriTrack } from "@/hooks/useNutriTrack";
import CircularProgress from "@/components/CircularProgress";
import { Card, CardContent } from "@/components/ui/card";

const Home: React.FC = () => {
  const { todayData } = useNutriTrack();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
      <Card className="w-full max-w-xs bg-gradient-to-br from-nutritrack-teal to-blue-400 border-0 shadow-xl">
        <div className="p-5 flex flex-col items-center text-white">
          <h2 className="text-lg font-semibold mb-2">Calorie Goal Progress</h2>
          <CircularProgress
            value={todayData.totalCalories}
            max={todayData.goal}
            size="lg"
          />
          <div className="mt-5 text-center">
            <div className="text-2xl font-bold">{todayData.totalCalories} / {todayData.goal} kcal</div>
            <div className="text-sm text-nutritrack-gray mt-1">
              {todayData.totalCalories < todayData.goal
                ? `${todayData.goal - todayData.totalCalories} kcal left today`
                : `Goal reached!`}
            </div>
          </div>
        </div>
        <CardContent>
          {/* You can add quick tips, motivational message, or actions here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
