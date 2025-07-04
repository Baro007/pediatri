import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, Bell, BookOpen, Award, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navItems = [
    { name: 'Ana Sayfa', icon: Home, href: '/' },
    { name: 'Bölümler', icon: BookOpen, href: '/chapters' },
    { name: 'Hakkında', icon: Award, href: '/about' },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const isActivePage = (href) => {
    return location.pathname === href;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm safe-area-inset">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center focus-ring rounded-lg">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="ml-2 text-xl font-bold text-gradient">PediaSemio</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 focus-ring ${
                  isActivePage(item.href)
                    ? 'text-primary-600 bg-primary-50 font-medium'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Bilgi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-64 focus:w-80 transition-all duration-300"
              />
            </div>
            
            {/* Notifications */}
            <motion.button
              className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200 focus-ring rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"></span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus-ring tap-highlight-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mobile-menu absolute left-0 right-0 top-16 bg-white border-b border-gray-200 shadow-lg z-50 md:hidden"
              >
                <div className="px-4 py-6 space-y-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Bilgi ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input pl-10 w-full"
                    />
                  </div>
                  
                  {/* Mobile Nav Items */}
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 tap-highlight-transparent ${
                          isActivePage(item.href)
                            ? 'text-primary-600 bg-primary-50 font-medium'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                  
                  {/* Mobile Actions */}
                  <div className="pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200 w-full tap-highlight-transparent">
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Bildirimler</span>
                      <span className="ml-auto w-2 h-2 bg-accent-500 rounded-full"></span>
                    </button>
                    
                    <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200 w-full tap-highlight-transparent">
                      <User className="w-5 h-5" />
                      <span className="font-medium">Profil</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 