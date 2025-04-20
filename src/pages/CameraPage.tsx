
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Image, Check, FlashlightOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export function CameraPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashActive, setFlashActive] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Simulate camera scanning effect
  useEffect(() => {
    if (isScanning) {
      // Simulate scanning delay
      const timer = setTimeout(() => {
        const foods = [
          "Apple",
          "Chicken Salad",
          "Yogurt with Berries",
          "Salmon Fillet",
          "Avocado Toast"
        ];
        const randomFood = foods[Math.floor(Math.random() * foods.length)];
        setDetectedFood(randomFood);
        setIsScanning(false);
        
        toast({
          title: "Food detected!",
          description: `Looks like ${randomFood}. Is this correct?`,
        });
      }, 2500);
      
      return () => clearTimeout(timer);
    }
  }, [isScanning, toast]);
  
  // Countdown effect
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setIsScanning(true);
        setCountdown(null);
      }
    }
  }, [countdown]);
  
  const handleStartScan = () => {
    setCountdown(3);
    toast({
      description: "Position food in the center of the frame",
    });
  };
  
  const handleConfirmFood = () => {
    if (detectedFood) {
      toast({
        title: "Success!",
        description: `${detectedFood} added to your food log`,
        variant: "default",
      });
      
      // Simulate adding the food and navigate back
      setTimeout(() => navigate('/add-food'), 1500);
    }
  };

  const toggleFlash = () => {
    setFlashActive(!flashActive);
    toast({
      description: flashActive ? "Flash turned off" : "Flash turned on",
    });
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Camera header - responsive for tablets */}
      <div className="p-4 md:p-6 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white"
          onClick={() => navigate(-1)}
        >
          <X size={24} />
        </Button>
        
        <h2 className="text-white text-lg md:text-xl font-medium">Scan Food</h2>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={toggleFlash}
          >
            <FlashlightOff size={24} className={flashActive ? "text-yellow-400" : "text-white"} />
          </Button>
          
          {!isMobile && (
            <Button variant="ghost" size="icon" className="text-white">
              <Settings size={24} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Camera viewport - optimized for different screen sizes */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Camera composition guides for tablets */}
        {!isMobile && !isScanning && !detectedFood && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-2 border-white/20 w-[85%] h-[85%] rounded-lg"></div>
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              <div className="border-r border-b border-white/10"></div>
              <div className="border-r border-l border-b border-white/10"></div>
              <div className="border-l border-b border-white/10"></div>
              <div className="border-r border-b border-t border-white/10"></div>
              <div className="border-r border-l border-b border-t border-white/10"></div>
              <div className="border-l border-b border-t border-white/10"></div>
              <div className="border-r border-t border-white/10"></div>
              <div className="border-r border-l border-t border-white/10"></div>
              <div className="border-l border-t border-white/10"></div>
            </div>
          </div>
        )}

        {/* Simulated camera view */}
        <div className={`w-full h-full bg-gray-900 flex items-center justify-center ${isScanning ? 'animate-pulse' : ''}`}>
          <Image size={64} className="text-gray-600" />
        </div>
        
        {/* Scanning overlay with adaptive size */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-nutritrack-teal rounded-lg animate-pulse flex items-center justify-center">
              <div className="bg-black/50 px-4 py-2 rounded-full">
                <p className="text-white text-sm md:text-base animate-bounce">Scanning...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Countdown overlay - larger on tablets */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-nutritrack-teal flex items-center justify-center">
              <p className="text-white text-4xl md:text-5xl font-bold">{countdown}</p>
            </div>
          </div>
        )}
        
        {/* Detection results - adaptive layout for tablets */}
        {detectedFood && !isScanning && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 p-4 md:p-6">
            <div className="bg-white rounded-lg p-4 md:p-6 max-w-2xl mx-auto">
              <h3 className="font-medium text-lg md:text-xl mb-2">{detectedFood}</h3>
              
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-500">Calories</p>
                  <p className="font-medium md:text-lg">245</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-500">Protein</p>
                  <p className="font-medium md:text-lg">12g</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-500">Carbs</p>
                  <p className="font-medium md:text-lg">30g</p>
                </div>
                <div className="text-center">
                  <p className="text-xs md:text-sm text-gray-500">Fat</p>
                  <p className="font-medium md:text-lg">8g</p>
                </div>
              </div>

              {/* For tablets, we add more detailed nutrition info */}
              {!isMobile && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Fiber</div>
                    <div>4g</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xs text-gray-500">Sugar</div>
                    <div>18g</div>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-full bg-nutritrack-teal hover:bg-nutritrack-teal/90 text-lg py-6"
                onClick={handleConfirmFood}
              >
                <Check size={16} className="mr-2" />
                Add to Log
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Camera controls - adaptive for tablets */}
      <div className="p-6 md:p-8 bg-black flex justify-center">
        {!isScanning && !detectedFood && (
          <Button 
            variant="outline" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white text-white hover:bg-white/20"
            onClick={handleStartScan}
          >
            <Camera size={isMobile ? 30 : 36} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default CameraPage;
