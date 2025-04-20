
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Layout from '@/components/Layout';
import FoodSearch from '@/components/FoodSearch';

export function CameraPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add Food</h1>
        </div>

        <Card className="p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Take a Photo</h2>
          <p className="text-muted-foreground">
            Snap a picture of your food to get nutritional information
          </p>
          <Button className="w-full" size="lg">
            Open Camera
          </Button>
        </Card>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Or search for food</h2>
          <FoodSearch />
        </div>
      </div>
    </Layout>
  );
}

export default CameraPage;
