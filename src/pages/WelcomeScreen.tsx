
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "Track your nutrition effortlessly",
    description: "Log meals with a simple tap, scan, or photo",
    image: "🍎"
  },
  {
    title: "Understand your habits",
    description: "Get insights into your eating patterns",
    image: "📊"
  },
  {
    title: "Achieve your goals",
    description: "One meal at a time, reach your health targets",
    image: "🎯"
  }
];

export function WelcomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigate('/language');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nutritrack-teal to-blue-600 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center text-white">
          <div className="text-6xl mb-8">{slides[currentSlide].image}</div>
          <h1 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h1>
          <p className="text-lg opacity-90 mb-8">{slides[currentSlide].description}</p>
          
          <div className="flex justify-center gap-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <Button 
          onClick={nextSlide}
          className="w-full bg-white text-nutritrack-teal hover:bg-white/90"
        >
          {currentSlide < slides.length - 1 ? (
            <>Next <ChevronRight className="ml-2" size={16} /></>
          ) : (
            'Get Started'
          )}
        </Button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
