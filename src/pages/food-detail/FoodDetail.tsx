
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNutriTrack } from "@/hooks/useNutriTrack";
import { toast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import FoodMainHeader from "./FoodMainHeader";
import FoodImage from "./FoodImage";
import FoodMacros from "./FoodMacros";
import FoodMetaInfo from "./FoodMetaInfo";
import FoodNutritionBars from "./FoodNutritionBars";
import FoodAddToMeal from "./FoodAddToMeal";
import { findFoodById } from "./findFoodById";

export default function FoodDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const navigate = useNavigate();
  const { todayData, addFoodEntry } = useNutriTrack();
  const [healthScore] = useState(7);
  const [quantity, setQuantity] = useState(1);

  const food = findFoodById(id, todayData);

  useEffect(() => {
    // Debug logs for tracing
    console.log("ID from params:", id);
    console.log("Resolved food:", food);
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
        description: `${food.name} added to your ${mealType}`,
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
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => navigate('/add-food')}
          >
            Search for Food
          </button>
        </div>
      </Layout>
    );
  }

  // Calculate adjusted nutrition
  const adjustedCalories = Math.round(food.calories * quantity);
  const adjustedProtein = +(food.protein * quantity).toFixed(1);
  const adjustedCarbs = +(food.carbs * quantity).toFixed(1);
  const adjustedFat = +(food.fat * quantity).toFixed(1);

  return (
    <Layout>
      <div className="space-y-4">
        <FoodMainHeader foodName={food.name} />

        <FoodImage foodName={food.name} />

        <Card className="p-4 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Calories</p>
              <div className="flex items-end">
                <span className="text-2xl font-semibold">{adjustedCalories}</span>
                <span className="text-sm text-gray-400 ml-1">kcal</span>
              </div>
            </div>
            <FoodMacros
              protein={adjustedProtein}
              fat={adjustedFat}
              carbs={adjustedCarbs}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </div>
          <Separator className="my-4" />
          <div className="space-y-4">
            {/* Edit buttons are skipped for brevity, add as needed */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-red-400 flex items-center justify-center text-white text-xs">P</div>
                <span>Protein</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{adjustedProtein}g</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs">F</div>
                <span>Fat</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{adjustedFat}g</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">C</div>
                <span>Carbs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{adjustedCarbs}g</span>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <FoodMetaInfo
            servingSize={food.servingSize}
            category={food.category}
            healthScore={healthScore}
          />
        </Card>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Nutritional Content</h3>
          <FoodNutritionBars
            protein={adjustedProtein}
            carbs={adjustedCarbs}
            fat={adjustedFat}
          />
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-lg font-medium">Add to Today</h3>
          <FoodAddToMeal onAdd={handleAddToMeal} />
        </div>
      </div>
    </Layout>
  );
}
