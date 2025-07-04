import React, { useState } from 'react';
import { Menu, X, Search, User, Bell, BookOpen, Award, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { name: 'Ana Sayfa', icon: Home, href: '/' },
    { name: 'Bölümler', icon: BookOpen, href: '/chapters' },
    { name: 'Değerlendirme', icon: Award, href: '/assessment' },
    { name: 'Araçlar', icon: User, href: '/tools' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
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
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Search Bar */}
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
              className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full"></span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Search */}
                <div className="relative mb-3">
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
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 