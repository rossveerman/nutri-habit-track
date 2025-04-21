
import React, { useState } from "react";
import { useFavourites } from "./FavouritesContext";
import { Food } from "@/types";
import { Search, HeartOff } from "lucide-react";
import FoodListItem from "./FoodListItem";

const FavouritesTab: React.FC = () => {
  const { favourites } = useFavourites();
  const [search, setSearch] = useState("");

  const filtered = !search
    ? favourites
    : favourites.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative">
        <input
          type="text"
          value={search}
          placeholder="Search favourites..."
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 w-full outline-nutritrack-teal text-sm"
        />
        <Search className="absolute left-2 top-2 text-gray-400" size={20} />
      </div>
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center pt-12 gap-2 text-muted-foreground">
          <HeartOff size={40} />
          <span className="text-lg text-center">
            {search
              ? "No favourites match your search."
              : "No favourites yet. Foods you favourite will appear here!"}
          </span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 bg-white rounded-lg shadow">
          {filtered.map(food => (
            <FoodListItem key={food.id} food={food} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesTab;
