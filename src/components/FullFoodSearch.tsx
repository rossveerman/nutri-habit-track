
import React from "react";
import { useFullFoodSearch } from "@/hooks/useFullFoodSearch";

// Table and input using shadcn/ui styles:
export default function FullFoodSearch() {
  const { search, setSearch, filteredFoods } = useFullFoodSearch();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Food Nutrient Search</h2>
      <input
        className="block w-full mb-4 border rounded px-3 py-2 text-base"
        placeholder="Search by food name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search foods"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded shadow text-sm">
          <thead className="bg-[#e5deff]">
            <tr>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Serving</th>
              <th className="px-2 py-2">Calories</th>
              <th className="px-2 py-2">Protein (g)</th>
              <th className="px-2 py-2">Carbs (g)</th>
              <th className="px-2 py-2">Fiber (g)</th>
              <th className="px-2 py-2">Sugars (g)</th>
              <th className="px-2 py-2">Fat (g)</th>
              <th className="px-2 py-2">Sodium (mg)</th>
              <th className="px-2 py-2">Calcium (mg)</th>
              <th className="px-2 py-2">Iron (mg)</th>
              <th className="px-2 py-2">Vit C (mg)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center py-8 text-gray-500">
                  No foods found.
                </td>
              </tr>
            ) : (
              filteredFoods.map((food) => (
                <tr key={food.id} className="hover:bg-[#f1edfa]">
                  <td className="border px-2 py-1">{food.name}</td>
                  <td className="border px-2 py-1">{food.serving}</td>
                  <td className="border px-2 py-1">{food.calories}</td>
                  <td className="border px-2 py-1">{food.protein}</td>
                  <td className="border px-2 py-1">{food.carbs}</td>
                  <td className="border px-2 py-1">{food.fiber}</td>
                  <td className="border px-2 py-1">{food.sugars}</td>
                  <td className="border px-2 py-1">{food.fat}</td>
                  <td className="border px-2 py-1">{food.sodium}</td>
                  <td className="border px-2 py-1">{food.calcium}</td>
                  <td className="border px-2 py-1">{food.iron}</td>
                  <td className="border px-2 py-1">{food.vitC}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
