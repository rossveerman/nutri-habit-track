
import { Food, generateId } from "../../types";

export const SNACKS_SWEETS: Food[] = [
  {
    id: generateId("snack", 1),
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
    vitaminC: 9,
    category: "snack",
  },
  {
    id: generateId("sweet", 2),
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
    vitaminC: 0,
    category: "sweet",
  },
  {
    id: generateId("sweet", 3),
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
    vitaminC: 0,
    category: "sweet",
  },
];

export default SNACKS_SWEETS;

