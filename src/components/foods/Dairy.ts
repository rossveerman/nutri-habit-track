
import { Food, generateId } from "../../types";

export const DAIRY: Food[] = [
  {
    id: generateId("dairy", 1),
    name: "Milk, whole",
    serving: "1 cup (244 g)",
    calories: 149,
    protein: 7.9,
    carbs: 12,
    fiber: 0,
    sugars: 12,
    fat: 8,
    sodium: 105,
    calcium: 276,
    iron: 0,
    vitaminC: 0,
    category: "dairy",
  },
  {
    id: generateId("dairy", 2),
    name: "Cheddar cheese",
    serving: "1 slice (28 g)",
    calories: 113,
    protein: 7,
    carbs: 0.4,
    fiber: 0,
    sugars: 0.1,
    fat: 9.3,
    sodium: 174,
    calcium: 199,
    iron: 0.2,
    vitaminC: 0,
    category: "dairy",
  },
  {
    id: generateId("dairy", 3),
    name: "Yogurt, plain",
    serving: "1 cup (245 g)",
    calories: 150,
    protein: 8.5,
    carbs: 11.5,
    fiber: 0,
    sugars: 11.5,
    fat: 8,
    sodium: 113,
    calcium: 296,
    iron: 0.1,
    vitaminC: 1,
    category: "dairy",
  },
];

export default DAIRY;

