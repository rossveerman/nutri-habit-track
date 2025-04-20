
import type { Food, DayData } from "@/types";
import { MOCK_FOOD_DATABASE } from "@/components/FoodDatabase";

/**
 * Finds a food by ID either in the user's meals (todayData), or in the static database.
 * Returns the found Food or null.
 */
export function findFoodById(id: string | undefined, todayData: DayData): Food | null {
  if (!id) return null;
  
  console.log("Searching for food with ID:", id);
  console.log("Available foods in database:", MOCK_FOOD_DATABASE.map(f => `${f.id}: ${f.name}`));

  // Search in meals
  for (const mealType of Object.keys(todayData.meals)) {
    const found = todayData.meals[mealType as keyof typeof todayData.meals].find(item => item.id === id);
    if (found) {
      console.log("Found food in meals:", found);
      return found;
    }
  }
  
  // Search in database
  const foodDb = MOCK_FOOD_DATABASE.find(item => item.id === id);
  if (foodDb) {
    console.log("Found food in database:", foodDb);
    return foodDb;
  }
  
  console.log("Food not found with ID:", id);
  return null;
}
