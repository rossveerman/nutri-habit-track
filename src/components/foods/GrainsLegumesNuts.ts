
import { Food, generateId } from "../../types";

export const GRAINS_LEGUMES_NUTS: Food[] = [
  {
    id: generateId("grain", 1),
    name: "Rice, white cooked",
    serving: "1 cup (158 g)",
    calories: 205,
    protein: 3.8,
    carbs: 44,
    fiber: 0.6,
    sugars: 0,
    fat: 0.5,
    sodium: 2,
    calcium: 16,
    iron: 1.9,
    vitaminC: 0,
    category: "grain",
  },
  {
    id: generateId("legume", 2),
    name: "Baked beans (canned)",
    serving: "½ cup (130 g)",
    calories: 122,
    protein: 7.2,
    carbs: 26,
    fiber: 7.2,
    sugars: 9.8,
    fat: 0.7,
    sodium: 549,
    calcium: 60,
    iron: 2,
    vitaminC: 1,
    category: "legume",
  },
  {
    id: generateId("nut", 3),
    name: "Almonds",
    serving: "1 oz (28 g)",
    calories: 162,
    protein: 6,
    carbs: 6.2,
    fiber: 3.5,
    sugars: 1.2,
    fat: 14,
    sodium: 1,
    calcium: 75,
    iron: 1,
    vitaminC: 0,
    category: "nut",
  },
];

export default GRAINS_LEGUMES_NUTS;

