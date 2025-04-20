
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FULL_FOOD_DATABASE } from "./FoodDatabaseFull";

const nutrientLabels = [
  { key: "serving", label: "Serving" },
  { key: "calories", label: "Calories" },
  { key: "protein", label: "Protein (g)" },
  { key: "carbs", label: "Carbs (g)" },
  { key: "fiber", label: "Fiber (g)" },
  { key: "sugars", label: "Sugars (g)" },
  { key: "fat", label: "Fat (g)" },
  { key: "sodium", label: "Sodium (mg)" },
  { key: "calcium", label: "Calcium (mg)" },
  { key: "iron", label: "Iron (mg)" },
  { key: "vitC", label: "Vit C (mg)" },
];

export default function MobileFoodList() {
  const [search, setSearch] = useState("");
  const lower = search.toLowerCase();
  const filtered = FULL_FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(lower) || food.serving.toLowerCase().includes(lower)
  );

  return (
    <div className="w-full max-w-md mx-auto p-2">
      <input
        className="block w-full border mb-2 rounded px-3 py-2 text-base"
        placeholder="Search foods…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        aria-label="Search foods"
      />
      <Accordion type="single" collapsible className="w-full space-y-1">
        {filtered.length === 0 && (
          <div className="text-gray-400 py-8 text-center">No foods found.</div>
        )}
        {filtered.map(food => (
          <AccordionItem value={food.name} key={food.id} className="border-b rounded-md shadow-sm bg-white mb-2">
            <AccordionTrigger className="px-3 py-3 text-left font-medium text-base w-full">
              {food.name}
              <span className="block text-xs text-gray-500">{food.serving}</span>
            </AccordionTrigger>
            <AccordionContent className="bg-[#f8f7fd] px-4 pt-2 pb-3 text-sm rounded-b-md">
              <table className="w-full">
                <tbody>
                  {nutrientLabels.map(({ key, label }) => (
                    <tr key={key}>
                      <td className="text-gray-600 pr-2">{label}</td>
                      <td className="text-right">{(food as any)[key]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
