
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Apple, Cookie, Pizza } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample food database - in a real app this would come from an API
  const foodDatabase: FoodItem[] = [
    { id: '1', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium' },
    { id: '2', name: 'Pizza Slice', calories: 285, protein: 12, carbs: 36, fat: 10, servingSize: '1 slice' },
    { id: '3', name: 'Greek Yogurt', calories: 130, protein: 12, carbs: 9, fat: 4, servingSize: '1 cup' },
    { id: '4', name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: '1 medium' },
  ];

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFood = (foodId: string) => {
    navigate(`/food/${foodId}`);
  };

  return (
    <Card className="w-full p-4">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search for foods..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="h-12"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Foods">
            {filteredFoods.map((food) => (
              <CommandItem
                key={food.id}
                onSelect={() => handleSelectFood(food.id)}
                className="flex items-center justify-between p-2"
              >
                <div className="flex items-center gap-2">
                  {food.name.toLowerCase().includes('apple') && <Apple className="h-4 w-4" />}
                  {food.name.toLowerCase().includes('pizza') && <Pizza className="h-4 w-4" />}
                  {food.name.toLowerCase().includes('cookie') && <Cookie className="h-4 w-4" />}
                  <div>
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {food.calories} kcal | {food.servingSize}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </Card>
  );
}

export default FoodSearch;
