
import React from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FoodMainHeaderProps {
  foodName: string;
}

const FoodMainHeader: React.FC<FoodMainHeaderProps> = ({ foodName }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </Button>
      <h1 className="text-xl font-semibold">{foodName}</h1>
      <Button variant="ghost" size="icon">
        <Heart size={20} />
      </Button>
    </div>
  );
};

export default FoodMainHeader;
