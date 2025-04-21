
export interface FoodFull {
  id: string;
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  sugars: number;
  fat: number;
  sodium: number;
  calcium: number;
  iron: number;
  vitC: number;
}

import { BEVERAGES } from "./foods/Beverages";
import { ALCOHOLIC_BEVERAGES } from "./foods/AlcoholicBeverages";
import { FRUITS } from "./foods/Fruits";
import { VEGETABLES } from "./foods/Vegetables";
import { GRAINS_LEGUMES_NUTS } from "./foods/GrainsLegumesNuts";
import { DAIRY } from "./foods/Dairy";
import { FATS_OILS_CONDIMENTS } from "./foods/FatsOilsCondiments";
import { SNACKS_SWEETS } from "./foods/SnacksSweets";
import { PROTEIN_FOODS } from "./foods/ProteinFoods";
import { MIXED_DISHES_FAST_FOODS } from "./foods/MixedDishesFastFoods";

// Add more import lines for new group files as needed

export const FULL_FOOD_DATABASE: FoodFull[] = [
  ...BEVERAGES,
  ...ALCOHOLIC_BEVERAGES,
  ...FRUITS,
  ...VEGETABLES,
  ...GRAINS_LEGUMES_NUTS,
  ...DAIRY,
  ...FATS_OILS_CONDIMENTS,
  ...SNACKS_SWEETS,
  ...PROTEIN_FOODS,
  ...MIXED_DISHES_FAST_FOODS,
  // Spread new arrays here if more groups are added
];

