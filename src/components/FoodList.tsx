
import React from "react";
import FoodListItem from "./FoodListItem";
import { Food } from "@/types";
import { Search } from "lucide-react";

// Results list (with empty state)
interface Props {
  foods: Food[];
  noResults?: boolean;
}

const FoodList: React.FC<Props> = ({ foods, noResults }) => {
  if (!foods.length)
    return (
      <div className="flex flex-col items-center py-12 gap-2 text-muted-foreground">
        <Search size={40} />
        <span className="text-lg">
          {noResults
            ? "No foods found. Try adjusting your search."
            : "No foods in this category."}
        </span>
      </div>
    );
  return (
    <ul className="divide-y divide-gray-100 bg-white rounded-lg shadow">
      {foods.map((food) => (
        <FoodListItem key={food.id} food={food} />
      ))}
    </ul>
  );
};

export default FoodList;
