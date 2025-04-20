
import React from "react";
import { Card } from "@/components/ui/card";
import MacroBar from "@/components/MacroBar";

interface FoodNutritionBarsProps {
  protein: number;
  carbs: number;
  fat: number;
}

const FoodNutritionBars: React.FC<FoodNutritionBarsProps> = ({ protein, carbs, fat }) => (
  <Card className="p-4">
    <div className="space-y-3">
      <MacroBar label="Protein" value={protein} max={50} color="bg-red-400" />
      <MacroBar label="Carbs" value={carbs} max={200} color="bg-blue-400" />
      <MacroBar label="Fat" value={fat} max={70} color="bg-yellow-400" />
    </div>
  </Card>
);

export default FoodNutritionBars;
