import React from 'react';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, isSidebarOpen }) => {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onMenuToggle}
            className="mr-3"
            aria-label={isSidebarOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isSidebarOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </Button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <h1 className="text-lg font-semibold text-slate-800 ml-2">
              Pediatri Rehberi
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search button for future implementation */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            aria-label="Ara"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}; 