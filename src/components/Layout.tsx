
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

  // Tablet and desktop layout
  if (!isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar for tablet/desktop */}
        <div className="w-64 bg-white border-r shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <Link to="/" className="text-xl font-bold text-nutritrack-teal">
              NutrifAI
            </Link>
          </div>
          
          <nav className="flex-1 px-3 py-4">
            <div className="space-y-1">
              <NavLink to="/" active={location.pathname === '/'} icon={<Home size={20} />} label="Dashboard" />
              <NavLink to="/add-food" active={location.pathname === '/add-food'} icon={<Plus size={20} />} label="Add Food" />
              <NavLink to="/camera" active={location.pathname === '/camera'} icon={<Camera size={20} />} label="Scan Food" />
              <NavLink to="/profile" active={location.pathname === '/profile'} icon={<User size={20} />} label="Profile" />
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
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b p-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">{getTitle(location.pathname)}</h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="search" 
                placeholder="Search foods..." 
                className="pl-10 pr-4 py-2 border rounded-full bg-gray-50 text-sm focus:ring-1 focus:ring-nutritrack-teal focus:border-nutritrack-teal"
              />
            </div>
          </header>
          
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // Mobile layout (original)
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
      
      <main className="flex-1 max-w-md mx-auto w-full p-4">
        {children}
      </main>
      
      <footer className="bg-white border-t p-4">
        <nav className="max-w-md mx-auto flex justify-between">
          <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-nutritrack-teal' : 'text-gray-400'}`}>
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link to="/add-food" className={`flex flex-col items-center p-2 ${location.pathname === '/add-food' ? 'text-nutritrack-teal' : 'text-gray-400'}`}>
            <div className="rounded-full bg-nutritrack-teal p-1 -mt-6 border-4 border-white">
              <Plus size={22} className="text-white" />
            </div>
            <span className="text-xs mt-1">Add</span>
          </Link>
          
          <Link to="/profile" className={`flex flex-col items-center p-2 ${location.pathname === '/profile' ? 'text-nutritrack-teal' : 'text-gray-400'}`}>
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}

// Helper component for tablet/desktop navigation links
function NavLink({ to, active, icon, label }: { to: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-lg text-sm ${
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
