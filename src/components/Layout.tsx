import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, User, Camera, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { FavouritesProvider } from './FavouritesContext';
import FoodSearch from './FoodSearch';
import FavouritesTab from './FavouritesTab';
import MobileTabFooter from './MobileTabFooter';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({
  children
}: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  const [selectedTab, setSelectedTab] = useState<"search" | "favourites">("search");

  const isLargeTablet = !isMobile && window.innerWidth >= 1024;

  if (!isMobile) {
    return (
      <FavouritesProvider>
        <div className="min-h-screen bg-gray-50 flex">
          <div className={`${isLargeTablet ? 'w-72' : 'w-64'} bg-white border-r shadow-sm flex flex-col`}>
            <div className="p-4 border-b">
              <Link to="/" className={`${isLargeTablet ? 'text-2xl' : 'text-xl'} font-bold text-nutritrack-teal`}>
                NutrifAI
              </Link>
            </div>
            
            <nav className="flex-1 px-3 py-4">
              <div className="space-y-1">
                <NavLink to="/" active={location.pathname === '/'} icon={<Home size={isLargeTablet ? 24 : 20} />} label="Dashboard" />
                <NavLink to="/add-food" active={location.pathname === '/add-food'} icon={<Plus size={isLargeTablet ? 24 : 20} />} label="Add Food" />
                <NavLink to="/camera" active={location.pathname === '/camera'} icon={<Camera size={isLargeTablet ? 24 : 20} />} label="Scan Food" />
                <NavLink to="/profile" active={location.pathname === '/profile'} icon={<User size={isLargeTablet ? 24 : 20} />} label="Profile" />
                
                {isLargeTablet && (
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Quick Access
                    </p>
                    <NavLink 
                      to="/auth" 
                      active={location.pathname === '/auth'} 
                      icon={<User size={24} />} 
                      label="Admin Access" 
                    />
                  </div>
                )}
              </div>
            </nav>
            
            <div className="p-4 border-t text-sm text-nutritrack-gray">
              <span>{new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b p-4 flex items-center justify-between">
              <h1 className={`${isLargeTablet ? 'text-2xl' : 'text-xl'} font-semibold`}>
                {getTitle(location.pathname)}
              </h1>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input 
                  type="search" 
                  placeholder="Search foods..." 
                  className={`pl-10 pr-4 py-2 border rounded-full bg-gray-50 text-sm focus:ring-1 focus:ring-nutritrack-teal focus:border-nutritrack-teal ${
                    isLargeTablet ? 'w-72' : 'w-64'
                  }`}
                />
              </div>
            </header>
            
            <main className={`flex-1 overflow-auto ${isLargeTablet ? 'p-8' : 'p-6'}`}>
              <div className={`mx-auto ${isLargeTablet ? 'max-w-6xl' : 'max-w-4xl'}`}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </FavouritesProvider>
    );
  }

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

function NavLink({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  const isLargeTablet = window.innerWidth >= 1024;
  
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-lg ${isLargeTablet ? 'text-base' : 'text-sm'} ${
        active
          ? "bg-nutritrack-teal text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function getTitle(path: string): string {
  switch (path) {
    case '/':
      return 'Dashboard';
    case '/add-food':
      return 'Add Food';
    case '/profile':
      return 'Profile';
    case '/camera':
      return 'Scan Food';
    default:
      return 'NutrifAI';
  }
}

export default Layout;
