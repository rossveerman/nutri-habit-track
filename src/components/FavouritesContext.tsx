
import React, { createContext, useContext, useEffect, useState } from "react";
import { Food } from "@/types";

interface FavouritesContextType {
  favourites: Food[];
  isFavourite: (id: string) => boolean;
  addFavourite: (food: Food) => void;
  removeFavourite: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

const FAV_STORAGE_KEY = "favouriteFoodsV2";

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
  const [favourites, setFavourites] = useState<Food[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(FAV_STORAGE_KEY);
    if (saved) {
      try {
        setFavourites(JSON.parse(saved));
      } catch {
        setFavourites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourite = (id: string) => favourites.some(f => f.id === id);

  const addFavourite = (food: Food) => {
    setFavourites(prev =>
      prev.some(f => f.id === food.id) ? prev : [...prev, food]
    );
  };
  const removeFavourite = (id: string) => {
    setFavourites(prev => prev.filter(f => f.id !== id));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be used within FavouritesProvider");
  return ctx;
}
