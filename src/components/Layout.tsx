import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, User, Camera, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({
  children
}: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Check for large tablets (iPad Pro, etc.)
  const isLargeTablet = !isMobile && window.innerWidth >= 1024;

  // Tablet and desktop layout with enhanced responsiveness
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar for tablet/desktop with adaptive width */}
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
              
              {/* Additional navigation links for large tablets */}
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
        
        {/* Main content with adaptive padding and max-width */}
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
    );
  }
  
  // Enhanced mobile layout with optimizations for different phone sizes
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-nutritrack-teal">
            NutrifAI
          </Link>
          <span className="text-sm text-nutritrack-gray">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
      </header>
      
      {/* Mobile main content with adaptive max-width based on screen size */}
      <main className="flex-1 mx-auto w-full p-4" style={{ maxWidth: 'min(100%, 540px)' }}>
        {children}
      </main>
    </div>
  );
}

// Helper component for tablet/desktop navigation links
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

// Helper to get page title based on path
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
