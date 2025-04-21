
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutriTrack } from '@/hooks/useNutriTrack';
import FoodEntryForm from '@/components/FoodEntryForm';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SearchFullFoodDialog from '@/components/SearchFullFoodDialog';
import { FoodFull } from '@/components/FoodDatabaseFull';
import MobileFoodList from '@/components/MobileFoodList';

export function AddFood() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [prefillFood, setPrefillFood] = useState<any | null>(null);

  const { addFoodEntry } = useNutriTrack();
  const navigate = useNavigate();
  
  const commonFoods = [
    { 
      name: 'Apple', 
      calories: 95, 
      protein: 0.5, 
      carbs: 25, 
      fat: 0.3, 
      serving: '1 medium', 
      servingSize: '1 medium', 
      fiber: 4.4,
      sugars: 19,
      sodium: 2,
      calcium: 11,
      iron: 0.2,
      vitaminC: 8.4,
      category: 'Fruit'
    },
    { 
      name: 'Banana', 
      calories: 105, 
      protein: 1.3, 
      carbs: 27, 
      fat: 0.4, 
      serving: '1 medium', 
      servingSize: '1 medium', 
      fiber: 3.1,
      sugars: 14.4,
      sodium: 1,
      calcium: 6,
      iron: 0.3,
      vitaminC: 10,
      category: 'Fruit'
    },
    { 
      name: 'Chicken Breast', 
      calories: 165, 
      protein: 31, 
      carbs: 0, 
      fat: 3.6, 
      serving: '100g', 
      servingSize: '100g', 
      fiber: 0,
      sugars: 0,
      sodium: 74,
      calcium: 5,
      iron: 0.9,
      vitaminC: 0,
      category: 'Protein'
    },
    { 
      name: 'Salmon', 
      calories: 206, 
      protein: 22, 
      carbs: 0, 
      fat: 13, 
      serving: '100g', 
      servingSize: '100g', 
      fiber: 0,
      sugars: 0,
      sodium: 59,
      calcium: 13,
      iron: 0.3,
      vitaminC: 0,
      category: 'Protein'
    },
    { 
      name: 'Greek Yogurt', 
      calories: 100, 
      protein: 17, 
      carbs: 6, 
      fat: 0.4, 
      serving: '170g', 
      servingSize: '170g', 
      fiber: 0,
      sugars: 6,
      sodium: 65,
      calcium: 187,
      iron: 0.1,
      vitaminC: 0,
      category: 'Dairy'
    },
    { 
      name: 'Eggs', 
      calories: 78, 
      protein: 6, 
      carbs: 0.6, 
      fat: 5, 
      serving: '1 large', 
      servingSize: '1 large', 
      fiber: 0,
      sugars: 0.6,
      sodium: 70,
      calcium: 28,
      iron: 0.9,
      vitaminC: 0,
      category: 'Protein'
    },
    { 
      name: 'Avocado', 
      calories: 240, 
      protein: 3, 
      carbs: 12, 
      fat: 22, 
      serving: '1 medium', 
      servingSize: '1 medium', 
      fiber: 10,
      sugars: 1,
      sodium: 10,
      calcium: 12,
      iron: 0.6,
      vitaminC: 10,
      category: 'Fruit'
    },
    { 
      name: 'Rice', 
      calories: 130, 
      protein: 2.7, 
      carbs: 28, 
      fat: 0.3, 
      serving: '100g cooked', 
      servingSize: '100g cooked', 
      fiber: 0.4,
      sugars: 0.1,
      sodium: 1,
      calcium: 10,
      iron: 0.2,
      vitaminC: 0,
      category: 'Grain'
    }
  ];

  const addQuickFood = (food: any, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    addFoodEntry({ ...food, quantity: 1, mealType });
    navigate('/');
  };

  const handleSelectDbFood = (food: FoodFull) => {
    setPrefillFood({
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      servingSize: food.serving,
      quantity: 1,
      mealType: 'breakfast',
    });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Add Food</h2>
      
      <div className="flex flex-col md:flex-row gap-2">
        <Button 
          onClick={() => {
            setPrefillFood(null);
            setIsFormOpen(true);
          }} 
          className="w-full bg-nutritrack-teal hover:bg-nutritrack-teal/90 text-white h-12"
        >
          <Plus className="mr-2" size={18} />
          Add Custom Food
        </Button>
        <Button
          variant="outline"
          className="w-full h-12"
          onClick={() => setIsSearchDialogOpen(true)}
        >
          Search food database
        </Button>
      </div>

      <SearchFullFoodDialog
        open={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
        onSelect={handleSelectDbFood}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Breakfast</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {commonFoods.slice(0, 3).map((food) => (
                <Button
                  key={food.name + 'breakfast'}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto py-2 font-normal"
                  onClick={() => addQuickFood(food, 'breakfast')}
                >
                  <div className="text-left">
                    <div>{food.name}</div>
                    <div className="text-xs text-nutritrack-gray">{food.calories} cal</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Lunch</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {commonFoods.slice(3, 6).map((food) => (
                <Button
                  key={food.name + 'lunch'}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto py-2 font-normal"
                  onClick={() => addQuickFood(food, 'lunch')}
                >
                  <div className="text-left">
                    <div>{food.name}</div>
                    <div className="text-xs text-nutritrack-gray">{food.calories} cal</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Dinner</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {commonFoods.slice(2, 5).map((food) => (
                <Button
                  key={food.name + 'dinner'}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto py-2 font-normal"
                  onClick={() => addQuickFood(food, 'dinner')}
                >
                  <div className="text-left">
                    <div>{food.name}</div>
                    <div className="text-xs text-nutritrack-gray">{food.calories} cal</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-base">Snack</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="space-y-2">
              {commonFoods.slice(6, 8).map((food) => (
                <Button
                  key={food.name + 'snack'}
                  variant="ghost"
                  className="w-full justify-start text-sm h-auto py-2 font-normal"
                  onClick={() => addQuickFood(food, 'snack')}
                >
                  <div className="text-left">
                    <div>{food.name}</div>
                    <div className="text-xs text-nutritrack-gray">{food.calories} cal</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <FoodEntryForm 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onAddFood={(food) => {
          addFoodEntry(food);
          navigate('/');
        }}
        {...(prefillFood ? { key: prefillFood.name, defaultValues: prefillFood } : {})}
      />
      
      {/* Moved Browse all foods heading and MobileFoodList here under the quick add cards */}
      <div className="block md:hidden pt-2">
        <h3 className="text-base font-semibold mb-2">Browse all foods</h3>
        <MobileFoodList />
      </div>
    </div>
  );
}

export default AddFood;
