import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    };

    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (window.innerWidth < 1024 && isSidebarOpen && !target.closest('aside') && !target.closest('header')) {
        closeSidebar();
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        
        <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          <div className="pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8 flex-1">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </div>
          <footer className="py-6 border-t border-slate-200 bg-white text-center text-sm text-slate-500">
            <p className="font-semibold text-slate-700">
              Pediatrik Klinik Asistanı
            </p>
            <p className="mt-1 text-xs">
              Geliştiren: <a href="https://dr.sadikbarisadiguzel.com/" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 hover:underline font-semibold">Dr. Sadık Barış Adıgüzel</a>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}; 