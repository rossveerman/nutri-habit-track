import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, X, Image, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FlashlightOff } from 'lucide-react';  // Corrected import

export function CameraPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedFood, setDetectedFood] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Camera header */}
      <div className="p-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white"
          onClick={() => navigate(-1)}
        >
          <X size={24} />
        </Button>
        
        <h2 className="text-white text-lg font-medium">Scan Food</h2>
        
        <Button variant="ghost" size="icon" className="text-white">
          <FlashlightOff size={24} />  {/* Corrected icon name */}
        </Button>
      </div>
      
      {/* Camera viewport */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated camera view */}
        <div className={`w-full h-full bg-gray-900 flex items-center justify-center ${isScanning ? 'animate-pulse' : ''}`}>
          <Image size={64} className="text-gray-600" />
        </div>
        
        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-nutritrack-teal rounded-lg animate-pulse flex items-center justify-center">
              <p className="text-white text-sm animate-bounce">Scanning...</p>
            </div>
          </div>
        )}
        
        {/* Countdown overlay */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-24 h-24 rounded-full bg-nutritrack-teal flex items-center justify-center">
              <p className="text-white text-4xl font-bold">{countdown}</p>
            </div>
          </div>
        )}
        
        {/* Detection results */}
        {detectedFood && !isScanning && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 p-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">{detectedFood}</h3>
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Calories</p>
                  <p className="font-medium">245</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Protein</p>
                  <p className="font-medium">12g</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Carbs</p>
                  <p className="font-medium">30g</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Fat</p>
                  <p className="font-medium">8g</p>
                </div>
              </div>
              <Button 
                className="w-full bg-nutritrack-teal hover:bg-nutritrack-teal/90"
                onClick={handleConfirmFood}
              >
                <Check size={16} className="mr-2" />
                Add to Log
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Camera controls */}
      <div className="p-6 bg-black flex justify-center">
        {!isScanning && !detectedFood && (
          <Button 
            variant="outline" 
            className="w-16 h-16 rounded-full border-4 border-white text-white hover:bg-white/20"
            onClick={handleStartScan}
          >
            <Camera size={30} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default CameraPage;
