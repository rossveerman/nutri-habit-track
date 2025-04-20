
import { useState, useEffect } from 'react';
import { Food, DayData, MealType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Default data for demonstration
const initialDay: DayData = {
  date: new Date().toISOString().split('T')[0],
  totalCalories: 0,
  totalProtein: 0,
  totalCarbs: 0,
  totalFat: 0,
  goal: 2000,
  meals: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: []
  }
};

// Sample food data
const sampleFoods: Food[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries',
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 6,
    servingSize: '1 bowl',
    quantity: 1,
    mealType: 'breakfast',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Grilled Chicken Salad',
    calories: 350,
    protein: 30,
    carbs: 15,
    fat: 18,
    servingSize: '1 plate',
    quantity: 1,
    mealType: 'lunch',
    timestamp: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Salmon with Vegetables',
    calories: 420,
    protein: 32,
    carbs: 20,
    fat: 22,
    servingSize: '1 fillet',
    quantity: 1,
    mealType: 'dinner',
    timestamp: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    calories: 150,
    protein: 15,
    carbs: 10,
    fat: 5,
    servingSize: '1 cup',
    quantity: 1,
    mealType: 'snack',
    timestamp: new Date().toISOString()
  }
];

export const useNutriTrack = () => {
  const [todayData, setTodayData] = useState<DayData>(() => {
    // Try to load from localStorage or use initial data
    const savedData = localStorage.getItem('nutriTrack_todayData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Check if the saved data is from today
      if (parsedData.date === new Date().toISOString().split('T')[0]) {
        return parsedData;
      }
    }
    // If no saved data for today, use sample data to demonstrate functionality
    const demoData = { ...initialDay };
    
    // Add sample foods to demonstrate functionality
    sampleFoods.forEach(food => {
      demoData.meals[food.mealType].push(food);
      demoData.totalCalories += food.calories;
      demoData.totalProtein += food.protein;
      demoData.totalCarbs += food.carbs;
      demoData.totalFat += food.fat;
    });
    
    return demoData;
  });
  
  const [user, setUser] = useState({
    name: 'User',
    calorieGoal: 2000,
    waterGoal: 8,
    waterIntake: 3
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nutriTrack_todayData', JSON.stringify(todayData));
  }, [todayData]);

  // Add a new food entry
  const addFoodEntry = (food: Omit<Food, 'id' | 'timestamp'>) => {
    const newFood: Food = {
      ...food,
      id: uuidv4(),
      timestamp: new Date().toISOString()
    };

    setTodayData(prev => {
      const updatedMeals = {
        ...prev.meals,
        [newFood.mealType]: [...prev.meals[newFood.mealType], newFood]
      };

      return {
        ...prev,
        totalCalories: prev.totalCalories + newFood.calories,
        totalProtein: prev.totalProtein + newFood.protein,
        totalCarbs: prev.totalCarbs + newFood.carbs,
        totalFat: prev.totalFat + newFood.fat,
        meals: updatedMeals
      };
    });
  };

  // Remove a food entry
  const removeFoodEntry = (id: string, mealType: MealType) => {
    setTodayData(prev => {
      const foodToRemove = prev.meals[mealType].find(f => f.id === id);
      
      if (!foodToRemove) return prev;
      
      const updatedMeals = {
        ...prev.meals,
        [mealType]: prev.meals[mealType].filter(f => f.id !== id)
      };

      return {
        ...prev,
        totalCalories: prev.totalCalories - foodToRemove.calories,
        totalProtein: prev.totalProtein - foodToRemove.protein,
        totalCarbs: prev.totalCarbs - foodToRemove.carbs,
        totalFat: prev.totalFat - foodToRemove.fat,
        meals: updatedMeals
      };
    });
  };

  // Update water intake
  const updateWaterIntake = (amount: number) => {
    setUser(prev => ({
      ...prev,
      waterIntake: Math.max(0, Math.min(prev.waterIntake + amount, prev.waterGoal))
    }));
  };

  // Update calorie goal
  const updateCalorieGoal = (goal: number) => {
    setUser(prev => ({
      ...prev,
      calorieGoal: goal
    }));
    
    setTodayData(prev => ({
      ...prev,
      goal
    }));
  };

  return {
    todayData,
    user,
    addFoodEntry,
    removeFoodEntry,
    updateWaterIntake,
    updateCalorieGoal
  };
};
