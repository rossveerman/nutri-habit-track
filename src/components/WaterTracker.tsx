
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  current: number;
  goal: number;
  onChange: (amount: number) => void;
}

export function WaterTracker({ current, goal, onChange }: WaterTrackerProps) {
  const percentage = Math.min(100, Math.max(0, (current / goal) * 100));
  
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Water Intake</h3>
        <span className="text-nutritrack-gray text-sm">{current} of {goal} glasses</span>
      </div>
      
      <div className="h-4 bg-blue-100 rounded-full mb-3 overflow-hidden">
        <div 
          className="h-full bg-blue-400 transition-all duration-300 ease-in-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onChange(-1)}
          className="h-8 w-8 p-0"
        >
          <Minus size={16} />
        </Button>
        
        <div className="flex space-x-1">
          {[...Array(goal)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-6 rounded ${i < current ? 'bg-blue-400' : 'bg-blue-100'}`}
            />
          ))}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onChange(1)}
          className="h-8 w-8 p-0"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
}

export default WaterTracker;
