
import React from 'react';
import { cn } from '@/lib/utils';

interface MacroBarProps {
  label: string;
  value: number;
  max: number;
  color: string;
  className?: string;
}

export function MacroBar({ label, value, max, color, className }: MacroBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm text-gray-500">{value}g</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ease-in-out rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default MacroBar;
