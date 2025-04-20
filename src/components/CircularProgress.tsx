
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
  
  // Color gradients for progress
  const getGradient = () => {
    if (percentage >= 100) return 'stroke-[url(#red-gradient)]';
    if (percentage >= 90) return 'stroke-[url(#yellow-gradient)]';
    return 'stroke-[url(#teal-gradient)]';
  };

  return (
    <div className={cn('relative flex items-center justify-center', sizeClasses[size], className)}>
      {/* SVG Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4fd1c5" />
            <stop offset="100%" stopColor="#38b2ac" />
          </linearGradient>
          <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f6ad55" />
            <stop offset="100%" stopColor="#ed8936" />
          </linearGradient>
          <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fc8181" />
            <stop offset="100%" stopColor="#f56565" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Background circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="10"
          strokeLinecap="round"
        />
        
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-500 ease-in-out', getGradient())}
          style={{ 
            transformBox: 'fill-box',
            transform: 'rotate(-90deg)', 
            transformOrigin: 'center' 
          }}
        />
      </svg>
      
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn('font-bold', 
            size === 'sm' ? 'text-xl' : 
            size === 'md' ? 'text-2xl' : 
            'text-3xl'
          )}>
            {value}
          </span>
          <span className={cn('text-nutritrack-gray',
            size === 'sm' ? 'text-xs' : 
            size === 'md' ? 'text-sm' : 
            'text-base'
          )}>
            kcal
          </span>
          <span className={cn('text-nutritrack-gray mt-1 text-xs')}>
            {value}/{max}
          </span>
        </div>
      )}
    </div>
  );
}

export default CircularProgress;
