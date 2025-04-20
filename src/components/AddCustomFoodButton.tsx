
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddCustomFoodButton: React.FC = () => {
  const handleAddCustom = () => {
    alert("Add custom food feature goes here!");
  };
  return (
    <div className="fixed right-4 bottom-4 z-10">
      <Button
        className="rounded-full px-6 py-4 bg-[#9b87f5] hover:bg-[#826dcf] text-white shadow-lg gap-2"
        onClick={handleAddCustom}
      >
        <Plus />
        <span className="font-semibold">Add Custom Food</span>
      </Button>
    </div>
  );
};
export default AddCustomFoodButton;
