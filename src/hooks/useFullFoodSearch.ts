
import { useState, useMemo } from "react";
import { FULL_FOOD_DATABASE, FoodFull } from "@/components/FoodDatabaseFull";

export function useFullFoodSearch() {
  const [search, setSearch] = useState("");
  
  const filteredFoods: FoodFull[] = useMemo(() => {
    if (!search) return FULL_FOOD_DATABASE;
    const lower = search.toLowerCase();
    return FULL_FOOD_DATABASE.filter((food) =>
      food.name.toLowerCase().includes(lower) ||
      food.serving.toLowerCase().includes(lower)
    );
  }, [search]);
  
  return {
    search,
    setSearch,
    filteredFoods,
  };
}
