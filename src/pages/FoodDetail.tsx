import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNutriTrack } from '@/hooks/useNutriTrack';
import Layout from '@/components/Layout';
import MacroBar from '@/components/MacroBar';
import { MOCK_FOOD_DATABASE } from '@/components/FoodDatabase';
import { toast } from '@/components/ui/use-toast';

export function FoodDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id; // Explicitly get the id from params
  const navigate = useNavigate();
  const { todayData, addFoodEntry } = useNutriTrack();
  const [healthScore] = useState(7);
  const [quantity, setQuantity] = useState(1);
  
  // Find the food item across all meal types or in the food database
  const findFood = () => {
    console.log("Looking for food with ID:", id);
    
    // First check in user's meals
    for (const mealType of Object.keys(todayData.meals)) {
      const food = todayData.meals[mealType as keyof typeof todayData.meals].find(
        item => item.id === id
      );
      if (food) {
        console.log("Found food in meals:", food);
        return food;
      }
    }
    
    // If not found in meals, check the food database
    const databaseFood = MOCK_FOOD_DATABASE.find(item => item.id === id);
    if (databaseFood) {
      console.log("Found food in database:", databaseFood);
      return databaseFood;
    }
    
    console.log("No food found with ID:", id);
    return null;
  };
  
  const food = findFood();

  useEffect(() => {
    // Log some debug info to help diagnose the issue
    console.log("ID from params:", id);
    console.log("Found food:", food);
    console.log("MOCK_FOOD_DATABASE length:", MOCK_FOOD_DATABASE.length);
    console.log("All database items:", MOCK_FOOD_DATABASE);
  }, [id, food]);
  
  const handleAddToMeal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    if (food) {
      const newFoodEntry = {
        ...food,
        quantity,
        mealType
      };
      addFoodEntry(newFoodEntry);
      toast({
        title: "Added to meal",
        description: `${food.name} added to your ${mealType}`
      });
      navigate('/dashboard');
    }
  };
  
  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  if (!food) {
    return (
      <Layout>
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">Food Not Found</h2>
          <p className="text-gray-500 mb-4">The requested food item could not be found.</p>
          <p className="text-sm text-gray-400 mb-4">ID: {id}</p>
          <Button onClick={() => navigate('/add-food')}>Search for Food</Button>
        </div>
      </Layout>
    );
  }
  
  // Calculate adjusted nutritional values based on quantity
  const adjustedCalories = Math.round(food.calories * quantity);
  const adjustedProtein = +(food.protein * quantity).toFixed(1);
  const adjustedCarbs = +(food.carbs * quantity).toFixed(1);
  const adjustedFat = +(food.fat * quantity).toFixed(1);
  
  return (
    <Layout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">{food.name}</h1>
          <Button variant="ghost" size="icon">
            <Heart size={20} />
          </Button>
        </div>
        
        <div className="relative rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
          <img 
            src={`https://source.unsplash.com/featured/?${encodeURIComponent(food.name)},food`}
            alt={food.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <Card className="p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Calories</p>
              <div className="flex items-end">
                <span className="text-2xl font-semibold">{adjustedCalories}</span>
                <span className="text-sm text-gray-400 ml-1">kcal</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Portion</p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus size={16} />
                </Button>
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
                <span className="font-medium">{adjustedProtein}g</span>
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
                <span className="font-medium">{adjustedFat}g</span>
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
                <span className="font-medium">{adjustedCarbs}g</span>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Edit size={12} />
                </Button>
              </div>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Serving Size</span>
              <span className="font-medium">{food.servingSize}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{food.category || "Uncategorized"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-500">Health Score</span>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
                  <Heart size={16} />
                </div>
                <span className="font-semibold">{healthScore}/10</span>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Nutritional Content</h3>
          <Card className="p-4">
            <div className="space-y-3">
              <MacroBar 
                label="Protein" 
                value={adjustedProtein} 
                max={50}
                color="bg-red-400" 
              />
              <MacroBar 
                label="Carbs" 
                value={adjustedCarbs} 
                max={200}
                color="bg-blue-400" 
              />
              <MacroBar 
                label="Fat" 
                value={adjustedFat} 
                max={70}
                color="bg-yellow-400" 
              />
            </div>
          </Card>
        </div>
        
        <div className="space-y-2 pt-2">
          <h3 className="text-lg font-medium">Add to Today</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => handleAddToMeal('breakfast')}>
              Add to Breakfast
            </Button>
            <Button variant="outline" onClick={() => handleAddToMeal('lunch')}>
              Add to Lunch
            </Button>
            <Button variant="outline" onClick={() => handleAddToMeal('dinner')}>
              Add to Dinner
            </Button>
            <Button variant="outline" onClick={() => handleAddToMeal('snack')}>
              Add as Snack
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FoodDetail;
