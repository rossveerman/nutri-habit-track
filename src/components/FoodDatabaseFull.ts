
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

// SAMPLE: Add more in this format!
export const FULL_FOOD_DATABASE: FoodFull[] = [
  {
    id: "1",
    name: "Apple (with skin)",
    serving: "1 medium (182g)",
    calories: 95,
    protein: 0.5,
    carbs: 25.1,
    fiber: 4.4,
    sugars: 18.9,
    fat: 0.3,
    sodium: 2,
    calcium: 11,
    iron: 0.2,
    vitC: 8.4,
  },
  {
    id: "2",
    name: "Banana",
    serving: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fiber: 3.1,
    sugars: 14.4,
    fat: 0.4,
    sodium: 1,
    calcium: 6,
    iron: 0.3,
    vitC: 10,
  },
  {
    id: "3",
    name: "Chicken breast (roasted)",
    serving: "½ breast (86g)",
    calories: 142,
    protein: 26.7,
    carbs: 0,
    fiber: 0,
    sugars: 0,
    fat: 3.1,
    sodium: 64,
    calcium: 5,
    iron: 0.5,
    vitC: 0,
  },
  {
    id: "4",
    name: "Coffee, black",
    serving: "1 cup (240 ml)",
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fiber: 0,
    sugars: 0,
    fat: 0,
    sodium: 5,
    calcium: 5,
    iron: 0,
    vitC: 0,
  },
  {
    id: "5",
    name: "Regular Beer",
    serving: "12 oz (355 ml)",
    calories: 153,
    protein: 1.7,
    carbs: 12.8,
    fiber: 0,
    sugars: 0,
    fat: 0,
    sodium: 14,
    calcium: 14,
    iron: 0.01,
    vitC: 0,
  }
];
