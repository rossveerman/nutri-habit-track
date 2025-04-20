
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@/components/CircularProgress';
import MacroBar from '@/components/MacroBar';
import MealSection from '@/components/MealSection';
import WaterTracker from '@/components/WaterTracker';
import { useNutriTrack } from '@/hooks/useNutriTrack';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, PlusCircle } from 'lucide-react';

export function Dashboard() {
  const { 
    todayData, 
    user, 
    removeFoodEntry, 
    updateWaterIntake 
  } = useNutriTrack();
  
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Today's Summary</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <CalendarIcon size={16} />
          <span>April 20</span>
        </Button>
      </div>
      
      {/* Calories and macros card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-nutritrack-teal to-blue-400 p-4 text-white">
          <h2 className="text-xl font-medium">Daily Progress</h2>
          <p className="text-sm opacity-90">
            {todayData.totalCalories} / {todayData.goal} calories
          </p>
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
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
                color="bg-red-400"
              />
              <MacroBar 
                label="Carbs" 
                value={todayData.totalCarbs} 
                max={200} 
                color="bg-blue-400"
              />
              <MacroBar 
                label="Fat" 
                value={todayData.totalFat} 
                max={70} 
                color="bg-yellow-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <WaterTracker 
        current={user.waterIntake} 
        goal={user.waterGoal} 
        onChange={updateWaterIntake}
      />
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">Today's Meals</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/add-food')}
            className="text-nutritrack-teal"
          >
            <PlusCircle size={16} className="mr-1" />
            Add Food
          </Button>
        </div>
        
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
