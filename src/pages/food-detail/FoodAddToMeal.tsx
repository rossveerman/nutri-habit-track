
import React from "react";
import { Button } from "@/components/ui/button";

interface FoodAddToMealProps {
  onAdd: (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
}

const FoodAddToMeal: React.FC<FoodAddToMealProps> = ({ onAdd }) => (
  <div className="grid grid-cols-2 gap-2">
    <Button variant="outline" onClick={() => onAdd('breakfast')}>Add to Breakfast</Button>
    <Button variant="outline" onClick={() => onAdd('lunch')}>Add to Lunch</Button>
    <Button variant="outline" onClick={() => onAdd('dinner')}>Add to Dinner</Button>
    <Button variant="outline" onClick={() => onAdd('snack')}>Add as Snack</Button>
  </div>
);

export default FoodAddToMeal;
