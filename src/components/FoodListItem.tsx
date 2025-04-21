
import React from "react";
import { Food } from "@/types";
import { Heart } from "lucide-react";
import { useFavourites } from "./FavouritesContext";
import { Link } from "react-router-dom";

interface Props {
  food: Food;
}

const FoodListItem: React.FC<Props> = ({ food }) => {
  const { isFavourite, addFavourite, removeFavourite } = useFavourites();
  const fav = isFavourite(food.id);

  return (
    <li className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition group">
      <Link to={`/food/${food.id}`} className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-base truncate">{food.name}</span>
        </div>
        <div className="text-xs text-gray-500">{food.serving}</div>
        <div className="flex gap-4 mt-2">
          <div className="text-xs text-gray-500">Calories: <span className="font-medium text-gray-800">{food.calories}</span></div>
          <div className="text-xs text-gray-500">Protein: <span className="font-medium text-gray-800">{food.protein}g</span></div>
          <div className="text-xs text-gray-500">Carbs: <span className="font-medium text-gray-800">{food.carbs}g</span></div>
          <div className="text-xs text-gray-500">Fat: <span className="font-medium text-gray-800">{food.fat}g</span></div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          fav ? removeFavourite(food.id) : addFavourite(food);
        }}
        aria-label={fav ? "Remove from favourites" : "Add to favourites"}
        className="p-1 rounded-full hover:bg-nutritrack-teal/10"
      >
        {fav ? <Heart className="text-red-500 fill-red-500" size={20} /> : <Heart className="text-gray-300" size={20} />}
      </button>
    </li>
  );
};

export default FoodListItem;
