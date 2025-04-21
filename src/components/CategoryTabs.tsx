
import React from "react";
import { FoodCategory } from "@/types";

type CategoryTabsProps = {
  categories: (FoodCategory | "All")[];
  selected: string;
  setSelected: (cat: string) => void;
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selected, setSelected }) => {
  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={
            "px-3 py-1.5 rounded-full text-sm font-medium transition border " +
            (selected === cat
              ? "bg-[#5E35B1] text-white border-[#5E35B1] shadow-sm"
              : "bg-white text-[#5E35B1] border-[#E0E0E0] hover:bg-[#ede7f6]")
          }
          aria-pressed={selected === cat}
          type="button"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
