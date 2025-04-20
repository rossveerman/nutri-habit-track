
import React from "react";
import { History } from "lucide-react";

interface Props {
  searches: string[];
  onChoose: (term: string) => void;
}

// Recent search chips with scroll on overflow
const RecentSearches: React.FC<Props> = ({ searches, onChoose }) => (
  <div className="mb-2">
    <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-gray-700">
      <History size={16} />
      Recent searches
    </div>
    <div className="flex gap-2 flex-wrap">
      {searches.map((term) => (
        <button
          key={term}
          tabIndex={0}
          className="px-3 py-1 rounded-full bg-[#f7fafc] border border-gray-200 text-sm hover:bg-purple-100 transition"
          onClick={() => onChoose(term)}
          type="button"
        >
          {term}
        </button>
      ))}
    </div>
  </div>
);

export default RecentSearches;
