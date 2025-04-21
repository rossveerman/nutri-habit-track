
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

// Add more import lines for new group files as needed

export const FULL_FOOD_DATABASE: FoodFull[] = [
  ...BEVERAGES,
  ...ALCOHOLIC_BEVERAGES,
  ...FRUITS,
  ...VEGETABLES,
  ...GRAINS_LEGUMES_NUTS,
  // Spread new arrays here if more groups are added
];

