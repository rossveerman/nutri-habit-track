
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

const CATEGORIES = ["Fruit", "Vegetable", "Protein", "Grain", "Dairy", "Nuts", "Other"];

interface FoodEntryFormProps {
  open: boolean;
  onClose: () => void;
  onAddFood: (food: Omit<Food, 'id' | 'timestamp'>) => void;
  defaultValues?: Partial<Food>;
  key?: string;
}

export function FoodEntryForm({ open, onClose, onAddFood, defaultValues }: FoodEntryFormProps) {
  const [formData, setFormData] = useState({
    name: defaultValues?.name || '',
    calories: defaultValues?.calories || 0,
    protein: defaultValues?.protein || 0,
    carbs: defaultValues?.carbs || 0,
    fat: defaultValues?.fat || 0,
    fiber: defaultValues?.fiber || 0,
    sugars: defaultValues?.sugars || 0,
    sodium: defaultValues?.sodium || 0,
    calcium: defaultValues?.calcium || 0,
    iron: defaultValues?.iron || 0,
    vitaminC: defaultValues?.vitaminC || 0,
    serving: defaultValues?.serving || '',
    servingSize: defaultValues?.servingSize || '',
    quantity: defaultValues?.quantity || 1,
    mealType: (defaultValues?.mealType || 'breakfast') as MealType,
    category: defaultValues?.category || 'Other'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'servingSize' || name === 'serving' ? value : Number(value)
    }));
  };

  const handleMealTypeChange = (value: MealType) => {
    setFormData(prev => ({
      ...prev,
      mealType: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
      name: formData.name,
      calories: formData.calories,
      protein: formData.protein,
      carbs: formData.carbs,
      fat: formData.fat,
      fiber: formData.fiber,
      sugars: formData.sugars,
      sodium: formData.sodium,
      calcium: formData.calcium,
      iron: formData.iron,
      vitaminC: formData.vitaminC,
      serving: formData.serving || "-",
      servingSize: formData.servingSize || "-",
      quantity: formData.quantity,
      mealType: formData.mealType,
      category: formData.category,
    });
    setFormData({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugars: 0,
      sodium: 0,
      calcium: 0, 
      iron: 0,
      vitaminC: 0,
      serving: '',
      servingSize: '',
      quantity: 1,
      mealType: 'breakfast',
      category: 'Other'
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
              <Label htmlFor="serving">Serving Size</Label>
              <Input 
                id="serving" 
                name="serving" 
                value={formData.serving} 
                onChange={handleChange}
                placeholder="e.g., 100g or 1 cup" 
                required
              />
            </div>

            <div>
              <Label htmlFor="servingSize">Serving Description</Label>
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
              <Label htmlFor="fiber">Fiber (g)</Label>
              <Input 
                id="fiber" 
                name="fiber" 
                type="number" 
                value={formData.fiber || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>

            <div>
              <Label htmlFor="sugars">Sugars (g)</Label>
              <Input 
                id="sugars" 
                name="sugars" 
                type="number" 
                value={formData.sugars || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>

            <div>
              <Label htmlFor="sodium">Sodium (mg)</Label>
              <Input 
                id="sodium" 
                name="sodium" 
                type="number" 
                value={formData.sodium || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>

            <div>
              <Label htmlFor="calcium">Calcium (mg)</Label>
              <Input 
                id="calcium" 
                name="calcium" 
                type="number" 
                value={formData.calcium || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>

            <div>
              <Label htmlFor="iron">Iron (mg)</Label>
              <Input 
                id="iron" 
                name="iron" 
                type="number" 
                value={formData.iron || ''} 
                onChange={handleChange}
                placeholder="0" 
              />
            </div>

            <div>
              <Label htmlFor="vitaminC">Vitamin C (mg)</Label>
              <Input 
                id="vitaminC" 
                name="vitaminC" 
                type="number" 
                value={formData.vitaminC || ''} 
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

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
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
