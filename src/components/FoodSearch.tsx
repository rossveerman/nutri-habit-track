import React from "react";
import FoodSearchBar from "./FoodSearchBar";
import CategoryTabs from "./CategoryTabs";
import RecentSearches from "./RecentSearches";
import FoodList from "./FoodList";
import AddCustomFoodButton from "./AddCustomFoodButton";
import { CATEGORIES } from "./FoodDatabase";
import { useFoodSearch } from "@/hooks/useFoodSearch";

const FoodSearch: React.FC = () => {
  const {
    search,
    setSearch,
    category,
    setCategory,
    recentSearches,
    filteredFoods,
    showRecent,
    handleRecentSearch,
    handleClear,
  } = useFoodSearch();

  // Scan barcode (demo)
  const handleScanBarcode = () => alert("Barcode scanner coming soon!");
  // Voice search (demo)
  const handleVoiceSearch = () => alert("Voice search coming soon!");

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4 animate-fade-in min-h-[80vh]">
      <FoodSearchBar
        search={search}
        setSearch={setSearch}
        onClear={handleClear}
        onScanBarcode={handleScanBarcode}
        onVoiceSearch={handleVoiceSearch}
      />
      <CategoryTabs categories={CATEGORIES} selected={category} setSelected={setCategory} />
      {showRecent && (
        <RecentSearches
          searches={recentSearches}
          onChoose={handleRecentSearch}
        />
      )}
      <div className="flex-1 min-h-[300px]">
        <FoodList foods={filteredFoods} noResults={!!search} />
      </div>
      <AddCustomFoodButton />
    </div>
  );
};

export default FoodSearch;
