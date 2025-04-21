
// Fixed to remove import of non-existing 'initialRecent' from FoodDatabase
import { useState, useMemo } from "react";
import { MOCK_FOOD_DATABASE, CATEGORIES } from "@/components/FoodDatabase";
import type { Food } from "@/types";

export function useFoodSearch() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // Empty initial recent

  const filteredFoods: Food[] = useMemo(() => {
    let foods = MOCK_FOOD_DATABASE;
    if (category !== "All") {
      foods = foods.filter((f) => f.category === category);
    }
    if (search) {
      foods = foods.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return foods;
  }, [search, category]);

  const showRecent = !search && category === "All" && recentSearches.length > 0;

  const handleRecentSearch = (term: string) => {
    setSearch(term);
    setRecentSearches((prev) => [
      term,
      ...prev.filter((t) => t !== term).slice(0, 4),
    ]);
  };

  const handleClear = () => setSearch("");

  return {
    search,
    setSearch,
    category,
    setCategory,
    recentSearches,
    setRecentSearches,
    filteredFoods,
    showRecent,
    handleRecentSearch,
    handleClear,
  };
}

