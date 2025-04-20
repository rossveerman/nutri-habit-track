
import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function CircularProgress({
  value,
  max,
  size = 'md',
  showText = true,
  className
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Calculate size based on the prop
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };
  
  // Calculate remaining calories
  const remaining = max - value;
  const remainingText = remaining > 0 
    ? `${remaining} left` 
    : `${Math.abs(remaining)} over`;
  
  // Color based on percentage
  const getColor = () => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 90) return 'text-amber-500';
    return 'text-nutritrack-teal';
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* Background circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-in-out transform origin-center', getColor())}
          style={{ 
            transformBox: 'fill-box',
            transform: 'rotate(-90deg)', 
            transformOrigin: 'center' 
          }}
        />
      </svg>
      
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn('font-bold transition-colors', getColor(), 
            size === 'sm' ? 'text-base' : 
            size === 'md' ? 'text-xl' : 
            'text-2xl'
          )}>
            {Math.round(percentage)}%
          </span>
          <span className={cn('text-nutritrack-gray mt-1',
            size === 'sm' ? 'text-xs' : 
            size === 'md' ? 'text-sm' : 
            'text-base'
          )}>
            {remainingText}
          </span>
        </div>
      )}
    </div>
  );
}

export default CircularProgress;
