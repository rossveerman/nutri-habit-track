
import React, { useState } from 'react';
import { FavouritesProvider } from './FavouritesContext';
import FoodSearch from './FoodSearch';
import FavouritesTab from './FavouritesTab';
import MobileTabFooter from './MobileTabFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [selectedTab, setSelectedTab] = useState<"search" | "favourites">("search");

  // For mobile: show the NutrifAI header, current date, FoodSearch/FavouritesTab, and MobileTabFooter
  return (
    <FavouritesProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b p-4">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <span className="text-xl font-bold text-nutritrack-teal">
              NutrifAI
            </span>
            <span className="text-sm text-nutritrack-gray">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full p-4" style={{ maxWidth: 'min(100%, 540px)' }}>
          {selectedTab === 'search' ? <FoodSearch /> : <FavouritesTab />}
        </main>
        <MobileTabFooter selected={selectedTab} onSelect={setSelectedTab} />
      </div>
    </FavouritesProvider>
  );
}

export default Layout;
