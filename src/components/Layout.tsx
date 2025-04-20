
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({
  children
}: LayoutProps) {
  const location = useLocation();
  return <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-NutrifAI-teal">
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
    </div>;
}

export default Layout;

