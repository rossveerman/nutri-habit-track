
import React from "react";

interface Props {
  categories: string[];
  selected: string;
  setSelected: (cat: string) => void;
}

// Responsive pill-style tabs for category filtering
const CategoryTabs: React.FC<Props> = ({
  categories,
  selected,
  setSelected,
}) => (
  <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar" tabIndex={-1}>
    {categories.map((cat) => (
      <button
        key={cat}
        className={`px-4 py-2 rounded-full transition 
          text-sm font-medium 
          ${selected === cat
            ? "bg-[#9b87f5] text-white shadow"
            : "bg-white text-neutral-600 hover:bg-purple-50 border border-neutral-200"
          }
        `}
        aria-current={selected === cat}
        onClick={() => setSelected(cat)}
        tabIndex={0}
        type="button"
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
