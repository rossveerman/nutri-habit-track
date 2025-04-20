import React, { useState, useMemo } from "react";
import { Search, QrCode, Mic, Plus, X, ChevronRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoryTabs from "./CategoryTabs";
import RecentSearches from "./RecentSearches";
import FoodList from "./FoodList";
import type { Food } from "@/types";

const MOCK_FOOD_DATABASE: Food[] = [
  {
    id: "1",
    name: "Apple",
    category: "Fruit",
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fat: 0.2,
    servingSize: "1 medium (182g)",
    quantity: 1,
    mealType: "snack",
    timestamp: "",
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "Protein",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    servingSize: "100g",
    quantity: 1,
    mealType: "lunch",
    timestamp: "",
  },
  {
    id: "3",
    name: "Brown Rice",
    category: "Grain",
    calories: 112,
    protein: 2.6,
    carbs: 23.5,
    fat: 0.9,
    servingSize: "100g cooked",
    quantity: 1,
    mealType: "lunch",
    timestamp: "",
  },
  {
    id: "4",
    name: "Avocado",
    category: "Fruit",
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    servingSize: "1/2 medium (100g)",
    quantity: 1,
    mealType: "breakfast",
    timestamp: "",
  },
  {
    id: "5",
    name: "Salmon",
    category: "Protein",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    servingSize: "100g",
    quantity: 1,
    mealType: "dinner",
    timestamp: "",
  },
  {
    id: "6",
    name: "Broccoli",
    category: "Vegetable",
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    servingSize: "100g",
    quantity: 1,
    mealType: "dinner",
    timestamp: "",
  },
  {
    id: "7",
    name: "Greek Yogurt",
    category: "Dairy",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    servingSize: "100g",
    quantity: 1,
    mealType: "breakfast",
    timestamp: "",
  },
  {
    id: "8",
    name: "Almonds",
    category: "Nuts",
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 49,
    servingSize: "100g",
    quantity: 1,
    mealType: "snack",
    timestamp: "",
  },
  {
    id: "9",
    name: "Banana",
    category: "Fruit",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3,
    servingSize: "1 medium (118g)",
    quantity: 1,
    mealType: "snack",
    timestamp: "",
  },
  {
    id: "10",
    name: "Egg",
    category: "Protein",
    calories: 68,
    protein: 5.5,
    carbs: 0.6,
    fat: 4.8,
    servingSize: "1 large (50g)",
    quantity: 1,
    mealType: "breakfast",
    timestamp: "",
  },
];

const CATEGORIES = [
  "All",
  "Fruit",
  "Vegetable",
  "Protein",
  "Grain",
  "Dairy",
  "Nuts",
];

const initialRecent = ["apple", "chicken", "rice"];

const FoodSearch: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState<string[]>(initialRecent);

  // Filtering logic
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

  // Show recent if no search and no filter
  const showRecent = !search && category === "All" && recentSearches.length > 0;

  // Add search to recent (in-memory; ready for persistence)
  const handleRecentSearch = (term: string) => {
    setSearch(term);
    setRecentSearches((prev) => [
      term,
      ...prev.filter((t) => t !== term).slice(0, 4),
    ]);
  };

  // Clear search and optionally category
  const handleClear = () => setSearch("");

  // Add Custom Food (mock handler for now)
  const handleAddCustom = () => {
    // Could navigate to add-food or open a modal
    alert("Add custom food feature goes here!");
  };

  // Scan barcode (demo)
  const handleScanBarcode = () => alert("Barcode scanner coming soon!");
  // Voice search (demo)
  const handleVoiceSearch = () => alert("Voice search coming soon!");

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 animate-fade-in min-h-[80vh]">
      {/* Search input and actions */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <div className="relative flex-1">
          <Input
            type="text"
            aria-label="Search foods"
            placeholder="Search foods..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-10"
          />
          <Search className="absolute left-3 top-2.5 text-muted-foreground" size={20} />
          {search && (
            <button
              aria-label="Clear search"
              className="absolute right-3 top-2.5 p-1 text-muted-foreground hover:text-red-500"
              onClick={handleClear}
              tabIndex={0}
              type="button"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center mt-2 md:mt-0">
          <Button
            variant="outline"
            size="icon"
            aria-label="Scan barcode"
            onClick={handleScanBarcode}
          >
            <QrCode />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Voice search"
            onClick={handleVoiceSearch}
          >
            <Mic />
          </Button>
        </div>
      </div>
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={
              "px-3 py-1.5 rounded-full text-sm font-medium transition border " +
              (category === cat
                ? "bg-[#5E35B1] text-white border-[#5E35B1] shadow-sm"
                : "bg-white text-[#5E35B1] border-[#E0E0E0] hover:bg-[#ede7f6]")
            }
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Recent searches */}
      {showRecent && (
        <RecentSearches
          searches={recentSearches}
          onChoose={handleRecentSearch}
        />
      )}
      {/* Results */}
      <div className="flex-1 min-h-[300px]">
        <FoodList foods={filteredFoods} noResults={!!search} />
      </div>
      {/* Custom food */}
      <div className="fixed right-4 bottom-4 z-10">
        <Button
          className="rounded-full px-6 py-4 bg-[#9b87f5] hover:bg-[#826dcf] text-white shadow-lg gap-2"
          onClick={handleAddCustom}
        >
          <Plus />
          <span className="font-semibold">Add Custom Food</span>
        </Button>
      </div>
    </div>
  );
};

export default FoodSearch;
