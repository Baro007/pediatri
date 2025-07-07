import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  subItems?: NavigationItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Ana Sayfa',
    icon: '⚕️',
    path: '/'
  },
  {
    id: 'assessment',
    label: 'Değerlendirme Esasları',
    icon: '🩺',
    path: '/assessment'
  },
  {
    id: 'development',
    label: 'Gelişim Takibi',
    icon: '👶',
    path: '/development'
  },
  {
    id: 'systems',
    label: 'Sistem Muayenesi',
    icon: '🫁',
    path: '/systems',
    subItems: [
      { id: 'respiratory', label: 'Solunum', icon: '🫁', path: '/systems/respiratory' },
      { id: 'cardiovascular', label: 'Kardiyovasküler', icon: '❤️', path: '/systems/cardiovascular' },
      { id: 'gastrointestinal', label: 'Gastrointestinal', icon: '🫄', path: '/systems/gastrointestinal' },
      { id: 'gu', label: 'Genitoüriner', icon: '💧', path: '/systems/gu' },
      { id: 'neuro', label: 'Nörolojik', icon: '🧠', path: '/systems/neuro' },
      { id: 'msk', label: 'Kas-İskelet', icon: '🦴', path: '/systems/msk' },
      { id: 'derma', label: 'Dermatolojik', icon: '😊', path: '/systems/derma' }
    ]
  },
  {
    id: 'scenarios',
    label: 'Sık Senaryolar',
    icon: '🚨',
    path: '/scenarios'
  },
  {
    id: 'quick-ref',
    label: 'Hızlı Başvuru',
    icon: '📊',
    path: '/quick-reference'
  },
  {
    id: 'references',
    label: 'Kaynaklar',
    icon: '📚',
    path: '/references'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['systems']));

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const isActiveItem = (path: string) => {
    return location.pathname === path;
  };

  const isParentActive = (item: NavigationItem) => {
    if (isActiveItem(item.path)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => isActiveItem(subItem.path));
    }
    return false;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-lg border-r border-slate-200',
          'transform transition-transform duration-300 ease-in-out',
          'lg:transform-none lg:static lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-slate-200">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              P
            </div>
            <h1 className="text-xl font-bold text-slate-800 ml-3">
              Pediatri Rehberi
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.id}>
                  {/* Main item */}
                  <div className="relative">
                    <Link
                      to={item.path}
                      className={clsx(
                        'medical-nav-link',
                        isParentActive(item) && 'active'
                      )}
                      onClick={() => {
                        if (item.subItems) {
                          toggleExpanded(item.id);
                        } else {
                          onClose();
                        }
                      }}
                    >
                      <span className="text-lg mr-3">{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.subItems && (
                        <span 
                          className={clsx(
                            'transition-transform duration-200',
                            expandedItems.has(item.id) && 'rotate-90'
                          )}
                        >
                          ▶
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* Sub items */}
                  {item.subItems && expandedItems.has(item.id) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={clsx(
                            'block px-4 py-2 text-sm rounded-lg transition-colors',
                            'text-slate-600 hover:bg-slate-100',
                            isActiveItem(subItem.path) && 'bg-teal-50 text-teal-700 font-medium'
                          )}
                          onClick={onClose}
                        >
                          <span className="mr-2">{subItem.icon}</span>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              v1.0.0 - Pediatrik Semiyoloji
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}; 