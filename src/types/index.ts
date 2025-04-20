
export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  quantity: number;
  mealType: MealType;
  timestamp: string;
  category?: string; // Add category field as optional
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
