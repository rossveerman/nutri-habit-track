
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CustomFoodEditor from '@/components/CustomFoodEditor';

export function CustomFoodPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Extract barcode from location state if available
  const { barcode, baseFood } = location.state || {};
  
  const handleSave = (foodData: any) => {
    // This would integrate with your state management in a real app
    console.log("Saved food data:", foodData);
    
    toast({
      title: "Food Created",
      description: `${foodData.name} has been saved to your custom foods`,
    });
    
    navigate('/');
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b p-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft size={20} />
          </Button>
          <span className="text-xl font-bold text-nutritrack-teal">
            {baseFood ? 'Edit Food' : 'Create Custom Food'}
          </span>
        </div>
      </header>
      
      <main>
        <CustomFoodEditor 
          barcode={barcode}
          baseFood={baseFood}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
}

export default CustomFoodPage;
