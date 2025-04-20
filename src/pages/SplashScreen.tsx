
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SplashScreen() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigate('/welcome');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-nutritrack-teal to-blue-600 flex items-center justify-center">
      <div className="text-white text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-2">NutrifAI</h1>
        <p className="text-lg opacity-90">Track smarter, live better</p>
      </div>
    </div>
  );
}

export default SplashScreen;
