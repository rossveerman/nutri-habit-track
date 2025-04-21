import React, { useState } from 'react';
import { Food, MealType, FoodCategory } from '@/types';
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

const CATEGORIES: FoodCategory[] = [
  "beverage",
  "alcohol",
  "fruit",
  "vegetable",
  "grain",
  "legume",
  "nut",
  "dairy",
  "protein",
  "condiment",
  "fat",
  "oil",
  "snack",
  "sweet",
  "mixed",
  "other",
];

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
    category: (defaultValues?.category || 'other') as FoodCategory
  });

  const [adding, setAdding] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

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

  const handleCategoryChange = (value: FoodCategory) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);

    setTimeout(() => {
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
        category: 'other'
      });
      setShowCheck(true);
      setAdding(false);
      setTimeout(() => {
        setShowCheck(false);
        onClose();
      }, 1100); // Enough time for checkmark to show
    }, 130); // Animation duration (matches scale in button)
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
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={adding}
              className={adding ? "opacity-80 pointer-events-none" : ""}
            >
              Cancel
            </Button>
            <div className="relative inline-flex items-center">
              <Button
                type="submit"
                className={
                  "bg-nutritrack-teal hover:bg-nutritrack-teal/90 transition-transform duration-150 " +
                  (adding ? "scale-95" : "scale-100")
                }
                style={{
                  transition: "transform 0.15s cubic-bezier(.68,-0.55,.27,1.55)"
                }}
                disabled={adding}
              >
                Add Food
              </Button>
              {showCheck && (
                <span
                  className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center animate-fade-in"
                  style={{ pointerEvents: "none" }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    stroke="#38B2AC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      background: "white",
                      borderRadius: "999px",
                      boxShadow: "0 1px 6px rgba(56,178,172,0.13)",
                      marginLeft: "4px",
                      animation: "scale-in 0.3s cubic-bezier(.58,1.7,.36,.95)"
                    }}
                  >
                    <circle
                      cx="16"
                      cy="16"
                      r="15"
                      stroke="#e6fffa"
                      strokeWidth="3"
                      fill="#fff"
                    />
                    <polyline
                      points="10 17 15 22 22 11"
                      stroke="#38B2AC"
                      strokeWidth="3"
                      fill="none"
                      style={{
                        strokeDasharray: 20,
                        strokeDashoffset: showCheck ? 0 : 20,
                        transition: "stroke-dashoffset 0.25s ease"
                      }}
                    />
                  </svg>
                </span>
              )}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FoodEntryForm;
