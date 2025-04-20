
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SplashScreen() {
  const navigate = useNavigate();
  const [animationState, setAnimationState] = useState('initial');
  
  useEffect(() => {
    // Start the animation sequence
    const sequence = async () => {
      // Start with logo animation
      setAnimationState('animate-logo');
      
      // After 1s, show the tagline
      setTimeout(() => {
        setAnimationState('animate-tagline');
      }, 1000);
      
      // After 2s total, navigate away
      setTimeout(() => {
        navigate('/welcome');
      }, 2000);
    };
    
    sequence();
    
    // Cleanup
    return () => {
      // Clear any pending timeouts if component unmounts
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-nutritrack-teal to-blue-600 flex items-center justify-center">
      <div className="text-white text-center px-8 max-w-md w-full">
        <div className={`transform transition-all duration-700 ${
          animationState === 'initial' ? 'opacity-0 scale-90' : 
          animationState === 'animate-logo' ? 'opacity-100 scale-100' : 
          'opacity-100 scale-100'
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">NutrifAI</h1>
          
          <div className={`transition-all duration-700 ${
            animationState === 'initial' || animationState === 'animate-logo' ? 
            'opacity-0 transform translate-y-4' : 
            'opacity-100 transform translate-y-0'
          }`}>
            <p className="text-lg sm:text-xl opacity-90">Track smarter, live better</p>
            
            {/* Loading indicator */}
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-24 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-[pulse_1.5s_ease-in-out_infinite] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
