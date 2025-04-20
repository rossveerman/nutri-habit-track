
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNutriTrack } from '@/hooks/useNutriTrack';
import Layout from '@/components/Layout';
import MacroBar from '@/components/MacroBar';
import { MOCK_FOOD_DATABASE } from '@/components/FoodDatabase';

export function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todayData } = useNutriTrack();
  const [healthScore] = useState(7);
  
  // Find the food item across all meal types or in the food database
  const findFood = () => {
    // First check in user's meals
    for (const mealType of Object.keys(todayData.meals)) {
      const food = todayData.meals[mealType as keyof typeof todayData.meals].find(
        item => item.id === id
      );
      if (food) return food;
    }
    
    // If not found in meals, check the food database
    const databaseFood = MOCK_FOOD_DATABASE.find(item => item.id === id);
    if (databaseFood) return databaseFood;
    
    return null;
  };
  
  const food = findFood();
  
  if (!food) {
    return (
      <Layout>
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">Food Not Found</h2>
          <p className="text-gray-500 mb-4">The requested food item could not be found.</p>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">{food.name}</h1>
          <Button variant="ghost" size="icon">
            <Heart size={20} />
          </Button>
        </div>
        
        <div className="relative rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901" 
            alt={food.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Card className="p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Calories</p>
              <div className="flex items-end">
                <span className="text-2xl font-semibold">{food.calories}</span>
                <span className="text-sm text-gray-400 ml-1">kcal</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Portion</p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">-</Button>
                <span className="text-lg">{food.quantity}</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">+</Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">P</div>
                <span>Protein</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{food.protein}g</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Edit size={12} />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs">F</div>
                <span>Fat</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{food.fat}g</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Edit size={12} />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">C</div>
                <span>Carbs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{food.carbs}g</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Edit size={12} />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Health Score</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
                  <Heart size={16} />
                </div>
                <span className="font-semibold">{healthScore}/10</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">Fix Results</Button>
          </div>
        </Card>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Nutritional Content</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <MacroBar 
                label="Protein" 
                value={food.protein} 
                max={50}
                color="bg-red-400" 
              />
              <MacroBar 
                label="Carbs" 
                value={food.carbs} 
                max={200}
                color="bg-blue-400" 
              />
              <MacroBar 
                label="Fat" 
                value={food.fat} 
                max={70}
                color="bg-yellow-400" 
              />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default FoodDetail;
