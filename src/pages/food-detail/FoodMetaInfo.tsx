
import React from "react";
import { Heart } from "lucide-react";

interface FoodMetaInfoProps {
  servingSize: string;
  category?: string;
  healthScore: number;
}

const FoodMetaInfo: React.FC<FoodMetaInfoProps> = ({ servingSize, category, healthScore }) => (
  <div className="space-y-2">
    <div className="flex justify-between">
      <span className="text-gray-500">Serving Size</span>
      <span className="font-medium">{servingSize}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-500">Category</span>
      <span className="font-medium">{category || "Uncategorized"}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-500">Health Score</span>
      <div className="flex items-center space-x-1">
        <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center">
          <Heart size={16} />
        </div>
        <span className="font-semibold">{healthScore}/10</span>
      </div>
    </div>
  </div>
);

export default FoodMetaInfo;
