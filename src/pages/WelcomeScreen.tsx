
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WelcomeSlide {
  title: string;
  description: string;
  image: string;
}

export function WelcomeScreen() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const slides: WelcomeSlide[] = [
    {
      title: "Track your nutrition effortlessly",
      description: "Log meals with a simple photo or quick search",
      image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Understand your habits",
      description: "Get insights into your nutritional patterns",
      image: "https://images.unsplash.com/photo-1615214981066-bcaae4726429?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Achieve your goals",
      description: "One meal at a time, reach your health targets",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setAnimating(false);
      }, 300);
    } else {
      navigate('/language');
    }
  };

  const goToLanguageSelection = () => {
    navigate('/language');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress indicators */}
      <div className="absolute top-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-6 bg-nutritrack-teal' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Skip button for non-first slides */}
      {currentSlide > 0 && (
        <button
          onClick={goToLanguageSelection}
          className="absolute top-6 right-6 text-sm text-gray-500 hover:text-gray-700 z-10"
        >
          Skip
        </button>
      )}
      
      {/* Slide content */}
      <div className={`flex-1 ${animating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="flex flex-col md:flex-row h-full">
          {/* Image section - takes full height on mobile, half width on tablets/desktop */}
          <div className="relative h-[40vh] md:h-auto md:w-1/2">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
            </div>
            
            {/* Title overlay on image for mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
              <h1 className="text-2xl font-bold text-white drop-shadow-md">
                {slides[currentSlide].title}
              </h1>
            </div>
          </div>

          {/* Text content section */}
          <div className="flex-1 flex flex-col justify-center px-6 py-8 md:p-12">
            {/* Hide this title on mobile as it's shown on the image */}
            <div className="hidden md:block mb-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {slides[currentSlide].title}
              </h1>
            </div>
            
            <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-12">
              {slides[currentSlide].description}
            </p>
            
            {/* Custom button size based on device */}
            <div className={isMobile ? "w-full" : "max-w-md"}>
              <Button 
                onClick={nextSlide} 
                className="w-full bg-nutritrack-teal hover:bg-nutritrack-teal/90 text-lg py-6"
              >
                {currentSlide < slides.length - 1 ? (
                  <>Continue <ChevronRight className="ml-2 h-5 w-5" /></>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>

            {/* On larger screens, show all pagination options */}
            <div className="hidden md:flex mt-8 gap-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-nutritrack-teal' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
