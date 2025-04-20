
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useFullFoodSearch } from "@/hooks/useFullFoodSearch";
import { FoodFull } from "./FoodDatabaseFull";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (food: FoodFull) => void;
}

export default function SearchFullFoodDialog({ open, onClose, onSelect }: Props) {
  const { search, setSearch, filteredFoods } = useFullFoodSearch();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Search Food Database</DialogTitle>
        </DialogHeader>
        <div className="mb-4">
          <input
            className="block w-full border rounded px-3 py-2 text-base"
            placeholder="Start typing to search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search foods"
          />
        </div>
        <div className="overflow-x-auto max-h-[340px]">
          <table className="min-w-full border rounded shadow text-xs">
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
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="text-center py-8 text-gray-500">
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
                      <td className="border px-2 py-1">
                        <Button
                          size="sm"
                          className="bg-nutritrack-teal text-white hover:bg-nutritrack-teal/90"
                          onClick={() => {
                            onSelect(food);
                            onClose();
                          }}
                        >
                          Add
                        </Button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
