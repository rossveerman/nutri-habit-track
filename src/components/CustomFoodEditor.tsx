
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FoodFormData = {
  name: string;
  brand: string;
  servingSize: string;
  servingSizeUnit: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  sugar: string;
  fiber: string;
  sodium: string;
};

interface Props {
  barcode?: string;
  baseFood?: Partial<FoodFormData>;
  onSave?: (data: any) => void;
  onCancel?: () => void;
}

const defaultFormData: FoodFormData = {
  name: "",
  brand: "",
  servingSize: "100",
  servingSizeUnit: "g",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  sugar: "",
  fiber: "",
  sodium: "",
};

const CustomFoodEditor: React.FC<Props> = ({
  barcode,
  baseFood,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<FoodFormData>({
    ...defaultFormData,
    ...baseFood,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sharePublicly, setSharePublicly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof FoodFormData, value: string) => {
    setFormData((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    ["calories", "protein", "carbs", "fat"].forEach((field) => {
      if (formData[field as keyof FoodFormData] && isNaN(Number(formData[field as keyof FoodFormData]))) {
        newErrors[field] = "Must be a number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // simulation of async action
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSave) onSave({ ...formData, barcode, sharePublicly });
    }, 600);
  };

  return (
    <form className="max-w-lg mx-auto pt-6" onSubmit={handleSubmit}>
      <Card className="p-0 overflow-visible shadow-none">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-4 pt-4 pb-2">
          <h1 className="text-xl font-semibold">
            {baseFood ? "Edit Food" : "Create Custom Food"}
          </h1>
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="text-nutritrack-teal"
          >
            Cancel
          </Button>
        </div>

        {/* Barcode badge */}
        {barcode && (
          <div className="flex gap-2 items-center mt-3 ml-4 px-2 py-1 bg-softPurple rounded font-mono text-xs text-vividPurple w-fit">
            <span className="font-bold">Barcode:</span>
            <span>{barcode}</span>
          </div>
        )}

        <div className="pt-2 px-4 pb-6">
          {/* Basic info */}
          <div>
            <label className="block font-medium mb-1 mt-3">Food Name <span className="text-red-500">*</span></label>
            <Input
              value={formData.name}
              onChange={e => update("name", e.target.value)}
              placeholder="e.g. Greek Yogurt"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div className="mt-4">
            <label className="block font-medium mb-1">Brand</label>
            <Input
              value={formData.brand}
              onChange={e => update("brand", e.target.value)}
              placeholder="e.g. Nature's Best"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">Serving Size</label>
              <Input
                value={formData.servingSize}
                onChange={e => update("servingSize", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="100"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Unit</label>
              <Input
                value={formData.servingSizeUnit}
                onChange={e => update("servingSizeUnit", e.target.value)}
                placeholder="g"
              />
            </div>
          </div>

          {/* Nutrition */}
          <div className="mt-8 mb-3 font-medium text-nutritrack-teal">
            Nutrition Facts (per serving)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="block mb-1">Calories <span className="text-red-500">*</span></label>
              <Input
                value={formData.calories}
                onChange={e => update("calories", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
                className={errors.calories ? "border-red-500" : ""}
              />
              {errors.calories && <p className="text-xs text-red-500 mt-1">{errors.calories}</p>}
            </div>
            <div>
              <label className="block mb-1">Protein (g) <span className="text-red-500">*</span></label>
              <Input
                value={formData.protein}
                onChange={e => update("protein", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
                className={errors.protein ? "border-red-500" : ""}
              />
              {errors.protein && <p className="text-xs text-red-500 mt-1">{errors.protein}</p>}
            </div>
            <div>
              <label className="block mb-1">Carbs (g) <span className="text-red-500">*</span></label>
              <Input
                value={formData.carbs}
                onChange={e => update("carbs", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
                className={errors.carbs ? "border-red-500" : ""}
              />
              {errors.carbs && <p className="text-xs text-red-500 mt-1">{errors.carbs}</p>}
            </div>
            <div>
              <label className="block mb-1">Fat (g) <span className="text-red-500">*</span></label>
              <Input
                value={formData.fat}
                onChange={e => update("fat", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
                className={errors.fat ? "border-red-500" : ""}
              />
              {errors.fat && <p className="text-xs text-red-500 mt-1">{errors.fat}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <div>
              <label className="block mb-1">Sugar (g)</label>
              <Input
                value={formData.sugar}
                onChange={e => update("sugar", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block mb-1">Fiber (g)</label>
              <Input
                value={formData.fiber}
                onChange={e => update("fiber", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block mb-1">Sodium (mg)</label>
              <Input
                value={formData.sodium}
                onChange={e => update("sodium", e.target.value)}
                inputMode="numeric"
                pattern="[0-9.]*"
                placeholder="0"
              />
            </div>
          </div>

          {/* Share with public */}
          {barcode && (
            <div className="mt-8 flex items-center justify-between px-2 py-4 bg-softPurple rounded">
              <div>
                <div className="font-medium text-vividPurple mb-1">Share with Community</div>
                <div className="text-xs text-gray-600 w-56 max-w-full">
                  Help others by adding this product to our public database.
                </div>
              </div>
              <Switch checked={sharePublicly} onCheckedChange={setSharePublicly} />
            </div>
          )}

          {/* Save button */}
          <Button
            className={cn("w-full mt-10 font-semibold bg-vividPurple text-white text-base hover:bg-primary")}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Custom Food"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default CustomFoodEditor;
