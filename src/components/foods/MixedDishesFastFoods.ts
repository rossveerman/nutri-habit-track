
import { Food, generateId } from "../../types";

export const MIXED_DISHES_FAST_FOODS: Food[] = [
  {
    id: generateId("mixed", 1),
    name: "McDonald’s Big Mac",
    serving: "1 burger (219 g)",
    calories: 563,
    protein: 25.9,
    carbs: 44,
    fiber: 3.5,
    sugars: 8.7,
    fat: 32.8,
    sodium: 1007,
    calcium: 254,
    iron: 4.4,
    vitaminC: 0.9,
    category: "mixed",
  },
  {
    id: generateId("mixed", 2),
    name: "Pepperoni pizza (fast-food)",
    serving: "1 large slice (107 g)",
    calories: 317,
    protein: 12.9,
    carbs: 35.3,
    fiber: 2,
    sugars: 3.8,
    fat: 12.8,
    sodium: 684,
    calcium: 201,
    iron: 2.7,
    vitaminC: 1.2,
    category: "mixed",
  },
  {
    id: generateId("mixed", 3),
    name: "Spaghetti with meat sauce",
    serving: "1 cup (256 g)",
    calories: 320,
    protein: 12,
    carbs: 40,
    fiber: 4,
    sugars: 6,
    fat: 11,
    sodium: 460,
    calcium: 50,
    iron: 2.5,
    vitaminC: 6,
    category: "mixed",
  },
];

export default MIXED_DISHES_FAST_FOODS;

