
import type { Food, DayData } from "@/types";
import { MOCK_FOOD_DATABASE } from "@/components/FoodDatabase";

/**
 * Finds a food by ID either in the user's meals (todayData), or in the static database.
 * Returns the found Food or null.
 */
export function findFoodById(id: string | undefined, todayData: DayData): Food | null {
  if (!id) return null;

  // Search in meals
  for (const mealType of Object.keys(todayData.meals)) {
    const found = todayData.meals[mealType as keyof typeof todayData.meals].find(item => item.id === id);
    if (found) return found;
  }
  // Search in database
  const foodDb = MOCK_FOOD_DATABASE.find(item => item.id === id);
  if (foodDb) return foodDb;
  return null;
}
