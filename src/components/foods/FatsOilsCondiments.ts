
import { FoodFull } from "../FoodDatabaseFull";

export const FATS_OILS_CONDIMENTS: FoodFull[] = [
  {
    id: "301",
    name: "Olive oil",
    serving: "1 Tbsp (13.5 g)",
    calories: 119,
    protein: 0,
    carbs: 0,
    fiber: 0,
    sugars: 0,
    fat: 13.5,
    sodium: 0,
    calcium: 1,
    iron: 0,
    vitC: 0,
    category: "oil"
  },
  {
    id: "302",
    name: "Butter (salted)",
    serving: "1 Tbsp (14 g)",
    calories: 100,
    protein: 0.1,
    carbs: 0,
    fiber: 0,
    sugars: 0,
    fat: 11.4,
    sodium: 90,
    calcium: 3,
    iron: 0,
    vitC: 0,
    category: "fat"
  },
  {
    id: "303",
    name: "Ketchup",
    serving: "1 Tbsp (17 g)",
    calories: 19,
    protein: 0.2,
    carbs: 4.4,
    fiber: 0,
    sugars: 3.6,
    fat: 0,
    sodium: 154,
    calcium: 3,
    iron: 0,
    vitC: 1,
    category: "condiment"
  },
  // Add other items and split accordingly: oils, fats, condiments (e.g. margarine, mayonnaise, salad dressing, etc.)
];
