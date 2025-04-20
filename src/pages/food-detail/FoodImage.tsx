
import React from "react";

interface FoodImageProps {
  foodName: string;
}

const FoodImage: React.FC<FoodImageProps> = ({ foodName }) => (
  <div className="relative rounded-lg overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
    <img
      src={`https://source.unsplash.com/featured/?${encodeURIComponent(foodName)},food`}
      alt={foodName}
      className="w-full h-full object-cover"
    />
  </div>
);

export default FoodImage;
