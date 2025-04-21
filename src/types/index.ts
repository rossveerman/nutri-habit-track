
export interface Food {
  id: string;
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  sugars: number;
  fat: number;
  sodium: number;
  calcium: number;
  iron: number;
  vitaminC: number;
  category: string;
  servingSize?: string;
  quantity?: number;
  mealType?: MealType;
  timestamp?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface DayData {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goal: number;
  meals: {
    breakfast: Food[];
    lunch: Food[];
    dinner: Food[];
    snack: Food[];
  };
}

export interface User {
  name: string;
  calorieGoal: number;
  waterGoal: number;
  waterIntake: number;
}

// Helper function to generate unique IDs
export const generateId = (prefix: string, index: number): string => {
  return `${prefix}-${index.toString().padStart(4, '0')}`;
};
