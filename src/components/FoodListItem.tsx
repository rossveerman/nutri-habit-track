
import React from "react";
import { Food } from "@/types";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FoodListItem: React.FC<{ food: Food }> = ({ food }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/food/${food.id}`);
  };

  return (
    <li
      className="flex items-center px-4 py-3 hover:bg-[#f1edfa] transition group cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${food.name}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-[#9b87f5] font-bold text-lg mr-4 flex-shrink-0">
        {food.name[0]}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{food.name}</div>
        <div className="text-xs text-muted-foreground">
          {food.servingSize} • {food.calories} cal
        </div>
      </div>
      <ChevronRight className="ml-3 text-muted-foreground opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition" />
    </li>
  );
};

export default FoodListItem;
