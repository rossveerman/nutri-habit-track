
import { FoodFull } from "../FoodDatabaseFull";

export const SNACKS_SWEETS: FoodFull[] = [
  {
    id: "401",
    name: "Potato chips",
    serving: "1 oz (28 g)",
    calories: 150,
    protein: 2,
    carbs: 15,
    fiber: 1.3,
    sugars: 0.1,
    fat: 9.5,
    sodium: 147,
    calcium: 7,
    iron: 0.4,
    vitC: 9,
    category: "snack"
  },
  {
    id: "402",
    name: "Chocolate bar (milk)",
    serving: "1 bar (44 g)",
    calories: 235,
    protein: 3.4,
    carbs: 26,
    fiber: 1.5,
    sugars: 22.9,
    fat: 13.2,
    sodium: 35,
    calcium: 83,
    iron: 1.1,
    vitC: 0,
    category: "sweet"
  },
  {
    id: "403",
    name: "Cookies (choc chip)",
    serving: "~2 cookies (30 g)",
    calories: 146,
    protein: 1.7,
    carbs: 19.2,
    fiber: 0.9,
    sugars: 9,
    fat: 7.2,
    sodium: 101,
    calcium: 4,
    iron: 0.3,
    vitC: 0,
    category: "sweet"
  },
  // If there are more, categorize as snack or sweet appropriately
];
