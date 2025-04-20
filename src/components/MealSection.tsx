
import React from 'react';
import { Food, MealType } from '@/types';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Trash2 } from 'lucide-react';

interface MealSectionProps {
  title: string;
  type: MealType;
  foods: Food[];
  onRemove: (id: string, type: MealType) => void;
}

export function MealSection({ title, type, foods, onRemove }: MealSectionProps) {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  
  return (
    <Accordion type="single" collapsible className="border rounded-md">
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 transition-colors">
          <div className="flex justify-between w-full items-center">
            <span className="font-medium">{title}</span>
            <span className="text-nutritrack-gray text-sm">{totalCalories} cal</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-3">
          {foods.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No foods logged yet.</p>
          ) : (
            <ul className="space-y-2">
              {foods.map((food) => (
                <li key={food.id} className="flex items-center justify-between border-b border-gray-100 py-2">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{food.name}</p>
                    <div className="flex gap-3 text-xs text-nutritrack-gray">
                      <span>{food.servingSize}</span>
                      <span>{food.calories} cal</span>
                      <span>{food.protein}p</span>
                      <span>{food.carbs}c</span>
                      <span>{food.fat}f</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemove(food.id, type)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove food"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default MealSection;
