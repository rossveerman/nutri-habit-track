
import React, { useState } from 'react';
import { Food, MealType } from '@/types';
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FoodEntryFormProps {
  open: boolean;
  onClose: () => void;
  onAddFood: (food: Omit<Food, 'id' | 'timestamp'>) => void;
}

export function FoodEntryForm({ open, onClose, onAddFood }: FoodEntryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: '',
    quantity: 1,
    mealType: 'breakfast' as MealType,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'servingSize' ? value : Number(value)
    }));
  };

  const handleMealTypeChange = (value: MealType) => {
    setFormData(prev => ({
      ...prev,
      mealType: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood(formData);
    setFormData({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: '',
      quantity: 1,
      mealType: 'breakfast',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Food Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                placeholder="e.g., Grilled Chicken" 
                required
              />
            </div>
            
            <div>
              <Label htmlFor="calories">Calories</Label>
              <Input 
                id="calories" 
                name="calories" 
                type="number" 
                value={formData.calories || ''} 
                onChange={handleChange}
                placeholder="0" 
                required
              />
            </div>
            
            <div>
              <Label htmlFor="servingSize">Serving Size</Label>
              <Input 
                id="servingSize" 
                name="servingSize" 
                value={formData.servingSize} 
                onChange={handleChange}
                placeholder="e.g., 100g or 1 cup" 
                required
              />
            </div>
            
            <div>
              <Label htmlFor="protein">Protein (g)</Label>
              <Input 
                id="protein" 
                name="protein" 
                type="number" 
                value={formData.protein || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>
            
            <div>
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input 
                id="carbs" 
                name="carbs" 
                type="number" 
                value={formData.carbs || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>
            
            <div>
              <Label htmlFor="fat">Fat (g)</Label>
              <Input 
                id="fat" 
                name="fat" 
                type="number" 
                value={formData.fat || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>
            
            <div>
              <Label htmlFor="mealType">Meal Type</Label>
              <Select value={formData.mealType} onValueChange={handleMealTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-nutritrack-teal hover:bg-nutritrack-teal/90">
              Add Food
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FoodEntryForm;
