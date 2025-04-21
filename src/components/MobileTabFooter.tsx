
import React from "react";
import { Search, Heart, UserRound } from "lucide-react";

interface Props {
  selected: "search" | "favourites" | "profile";
  onSelect: (tab: "search" | "favourites" | "profile") => void;
}

export default function MobileTabFooter({ selected, onSelect }: Props) {
  return (
    <footer className="bg-white border-t p-2 safe-area-bottom">
      <nav className="max-w-md mx-auto flex justify-around">
        <button
          className={`flex flex-col items-center p-2 ${selected === "search" ? "text-nutritrack-teal" : "text-gray-400"}`}
          onClick={() => onSelect("search")}
        >
          <Search size={22} />
          <span className="text-xs mt-1">Search</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${selected === "favourites" ? "text-nutritrack-teal" : "text-gray-400"}`}
          onClick={() => onSelect("favourites")}
        >
          <Heart size={22} />
          <span className="text-xs mt-1">Favourites</span>
        </button>
        <button
          className={`flex flex-col items-center p-2 ${selected === "profile" ? "text-nutritrack-teal" : "text-gray-400"}`}
          onClick={() => onSelect("profile")}
        >
          <UserRound size={22} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>
    </footer>
  );
}
