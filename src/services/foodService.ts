
import { Food, MealType, FoodCategory } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Type for the food data without id and timestamp
type NewFoodData = Omit<Food, 'id' | 'timestamp'>;

// Function to add a new food
export const addFood = (foodData: NewFoodData): Food => {
  const newFood: Food = {
    ...foodData,
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    category: foodData.category || 'other'
  };

  const existingFoods = getFoods();
  const updatedFoods = [...existingFoods, newFood];
  localStorage.setItem('foods', JSON.stringify(updatedFoods));
  return newFood;
};

// Function to get all foods
export const getFoods = (): Food[] => {
  const foodsJson = localStorage.getItem('foods');
  return foodsJson ? JSON.parse(foodsJson) : [];
};

// Function to update a food item by id
export const updateFood = (id: string, updatedData: Partial<NewFoodData>): Food | undefined => {
  const foods = getFoods();
  const idx = foods.findIndex(f => f.id === id);
  if (idx === -1) return undefined;

  const updatedFood = { ...foods[idx], ...updatedData };
  foods[idx] = updatedFood;
  localStorage.setItem('foods', JSON.stringify(foods));
  return updatedFood;
};

// Function to delete a food item by id
export const deleteFood = (id: string): boolean => {
  const foods = getFoods();
  const filtered = foods.filter(f => f.id !== id);
  if (filtered.length === foods.length) return false; // Not found
  localStorage.setItem('foods', JSON.stringify(filtered));
  return true;
};

// Get foods by category
export const getFoodsByCategory = (category: FoodCategory): Food[] => {
  return getFoods().filter(food => food.category === category);
};

// Get foods by meal type
export const getFoodsByMealType = (mealType: MealType): Food[] => {
  return getFoods().filter(food => food.mealType === mealType);
};
