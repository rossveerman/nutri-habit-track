
import React from 'react';
import CircularProgress from '@/components/CircularProgress';
import MacroBar from '@/components/MacroBar';
import MealSection from '@/components/MealSection';
import WaterTracker from '@/components/WaterTracker';
import { useNutriTrack } from '@/hooks/useNutriTrack';

export function Dashboard() {
  const { 
    todayData, 
    user, 
    removeFoodEntry, 
    updateWaterIntake 
  } = useNutriTrack();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-1">Daily Progress</h2>
          <p className="text-nutritrack-gray text-sm mb-4">
            {todayData.totalCalories} / {todayData.goal} calories
          </p>
          
          <CircularProgress 
            value={todayData.totalCalories} 
            max={todayData.goal} 
            size="lg"
          />
          
          <div className="w-full mt-6 space-y-3">
            <MacroBar 
              label="Protein" 
              value={todayData.totalProtein} 
              max={120} 
              color="bg-nutritrack-purple"
            />
            <MacroBar 
              label="Carbs" 
              value={todayData.totalCarbs} 
              max={200} 
              color="bg-nutritrack-teal"
            />
            <MacroBar 
              label="Fat" 
              value={todayData.totalFat} 
              max={70} 
              color="bg-nutritrack-mint"
            />
          </div>
        </div>
      </div>
      
      <WaterTracker 
        current={user.waterIntake} 
        goal={user.waterGoal} 
        onChange={updateWaterIntake}
      />
      
      <div className="space-y-3">
        <h3 className="font-medium text-lg">Today's Meals</h3>
        
        <MealSection 
          title="Breakfast" 
          type="breakfast"
          foods={todayData.meals.breakfast}
          onRemove={removeFoodEntry}
        />
        
        <MealSection 
          title="Lunch" 
          type="lunch"
          foods={todayData.meals.lunch}
          onRemove={removeFoodEntry}
        />
        
        <MealSection 
          title="Dinner" 
          type="dinner"
          foods={todayData.meals.dinner}
          onRemove={removeFoodEntry}
        />
        
        <MealSection 
          title="Snacks" 
          type="snack"
          foods={todayData.meals.snack}
          onRemove={removeFoodEntry}
        />
      </div>
    </div>
  );
}

export default Dashboard;
