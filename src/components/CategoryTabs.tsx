
import React, { useRef } from "react";
import { FoodCategory } from "@/types";

type CategoryTabsProps = {
  categories: (FoodCategory | "All")[];
  selected: string;
  setSelected: (cat: string) => void;
};

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, selected, setSelected }) => {
  // Ripple references for animation
  const rippleRefs = useRef<{[k:string]:HTMLSpanElement|null}>({});

  const handleTabClick = (cat: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(cat);
    // Animate ripple
    const rippleSpan = rippleRefs.current[cat];
    if (rippleSpan) {
      rippleSpan.classList.remove('animate-fade-out');
      rippleSpan.classList.remove('animate-fade-in');
      void rippleSpan.offsetWidth; // Reset animation
      rippleSpan.classList.add('animate-fade-in');
      setTimeout(() => {
        rippleSpan.classList.remove('animate-fade-in');
        rippleSpan.classList.add('animate-fade-out');
      }, 200);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={e => handleTabClick(cat, e)}
          className={
            "px-4 py-2 rounded-full text-sm font-medium transition border relative overflow-visible whitespace-nowrap " +
            (selected === cat
              ? "bg-[#5E35B1] text-white border-[#5E35B1] shadow-sm"
              : "bg-white text-[#5E35B1] border-[#E0E0E0] hover:bg-[#ede7f6]")
          }
          aria-pressed={selected === cat}
          type="button"
          style={{ position: "relative", minWidth: "60px" }}
        >
          {cat}
          <span
            ref={el => rippleRefs.current[cat] = el}
            className="pointer-events-none absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-nutritrack-mint opacity-30 -translate-x-1/2 -translate-y-1/2 scale-125"
            style={{ zIndex: 0 }}
          />
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;

