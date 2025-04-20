
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Minus } from "lucide-react";

interface FoodMacrosProps {
  protein: number;
  fat: number;
  carbs: number;
  quantity: number;
  onQuantityChange: (change: number) => void;
}

const FoodMacros: React.FC<FoodMacrosProps> = ({ protein, fat, carbs, quantity, onQuantityChange }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-1">
      <p className="text-sm text-gray-500">Calories</p>
      {/* The "Calories" value is calculated/displayed by parent */}
      {/* This component expects to receive correct protein/carb/fat for the given quantity */}
      {/* Calories is handled separately */}
    </div>
    <div className="space-y-1">
      <p className="text-sm text-gray-500">Portion</p>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onQuantityChange(-1)}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </Button>
        <span className="text-lg">{quantity}</span>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onQuantityChange(1)}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  </div>
);

export default FoodMacros;
