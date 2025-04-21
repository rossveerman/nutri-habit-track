
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BarcodeScanner from '@/components/BarcodeScanner';
import { useToast } from '@/hooks/use-toast';
import { MOCK_FOOD_DATABASE } from '@/components/FoodDatabase';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function BarcodeScannerPage() {
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [foodItem, setFoodItem] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleBarcodeScan = (code: string) => {
    setScannedCode(code);
    setIsLoading(true);
    
    // Simulate API lookup with mock data
    setTimeout(() => {
      // In reality, you'd make an API call to a food database using the barcode
      // For demo purposes, just randomly select an item from our mock database
      const randomIndex = Math.floor(Math.random() * MOCK_FOOD_DATABASE.length);
      const mockFood = MOCK_FOOD_DATABASE[randomIndex];
      
      setFoodItem({
        ...mockFood,
        barcode: code
      });
      
      setIsLoading(false);
      
      toast({
        title: "Food Identified",
        description: `Found: ${mockFood.name}`,
      });
    }, 1500);
  };
  
  const addFoodToLog = () => {
    if (foodItem) {
      // In a real app, this would add the food to the user's log
      toast({
        title: "Success!",
        description: `${foodItem.name} added to your food log`,
        variant: "default",
      });
      
      // Navigate back to main page
      setTimeout(() => navigate('/'), 1000);
    }
  };
  
  const scanAgain = () => {
    setScannedCode(null);
    setFoodItem(null);
  };
  
  return (
    <div className="h-screen w-screen">
      {!scannedCode ? (
        <BarcodeScanner onScan={handleBarcodeScan} />
      ) : (
        <div className="p-4 max-w-md mx-auto pt-8">
          {isLoading ? (
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nutritrack-teal mb-4"></div>
                <p>Looking up product information...</p>
              </div>
            </Card>
          ) : foodItem ? (
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-xl font-semibold">{foodItem.name}</h3>
                <p className="text-sm text-gray-500">{foodItem.category}</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-xs text-gray-500">Calories</p>
                    <p className="font-medium">{foodItem.calories} kcal</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-center">
                    <p className="text-xs text-gray-500">Serving</p>
                    <p className="font-medium">{foodItem.servingSize}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Protein</p>
                    <p className="font-medium">{foodItem.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Carbs</p>
                    <p className="font-medium">{foodItem.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Fat</p>
                    <p className="font-medium">{foodItem.fat}g</p>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mb-2">Barcode</p>
                <p className="font-mono text-sm bg-gray-50 p-2 rounded mb-6">{foodItem.barcode}</p>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={scanAgain}
                  >
                    Scan Another
                  </Button>
                  <Button 
                    className="flex-1 bg-nutritrack-teal hover:bg-nutritrack-teal/90"
                    onClick={addFoodToLog}
                  >
                    Add to Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-600 mb-4">Could not identify the product with barcode: {scannedCode}</p>
              <Button onClick={scanAgain}>Try Again</Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default BarcodeScannerPage;
