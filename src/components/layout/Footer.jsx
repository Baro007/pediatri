import React from 'react';
import { Heart, Mail, ExternalLink, BookOpen, Award, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const quickLinks = [
    { name: 'Ana Sayfa', href: '/', icon: Home },
    { name: 'Bölümler', href: '/chapters', icon: BookOpen },
    { name: 'Değerlendirme', href: '/assessment', icon: Award },
    { name: 'Araçlar', href: '/tools', icon: User },
  ];

  const resources = [
    { name: 'American Academy of Pediatrics', href: '#' },
    { name: 'ESPGHAN Kılavuzları', href: '#' },
    { name: 'Türk Pediatri Kurumu', href: '#' },
    { name: 'WHO Growth Standards', href: '#' },
  ];

  const tools = [
    { name: 'Büyüme Eğrileri', href: '#' },
    { name: 'Doz Hesaplayıcı', href: '#' },
    { name: 'M-CHAT-R Tarama', href: '#' },
    { name: 'Klinik Skorlar', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <span className="ml-3 text-2xl font-bold text-gradient">PediaSemio</span>
            </motion.div>
            
            <p className="text-gray-600 mb-4 max-w-md">
              Pediatrik semiyolojide kanıta dayalı, interaktif ve kapsamlı eğitim platformu. 
              Hekimler için güvenilir bilgi kaynağı ve pratik araçlar.
            </p>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for medical professionals</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a 
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kaynak Kuruluşlar</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <motion.li key={resource.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <a 
                    href={resource.href}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="text-sm">{resource.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Tools Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interaktif Araçlar</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <motion.a
                key={tool.name}
                href={tool.href}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-sm font-medium text-gray-900">{tool.name}</div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2024 PediaSemio. Tüm hakları saklıdır. Eğitim amaçlı geliştirilmiştir.
            </div>
            
            <div className="flex items-center space-x-6">
              <motion.a
                href="mailto:info@pedisemio.com"
                className="flex items-center space-x-2 text-sm text-gray-500 hover:text-primary-600 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="w-4 h-4" />
                <span>İletişim</span>
              </motion.a>
              
              <div className="text-sm text-gray-400">
                v1.0.0
              </div>
            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Önemli Uyarı:</strong> Bu platform eğitim amaçlıdır ve klinik karar alma sürecini desteklemek için tasarlanmıştır. 
            Hasta bakımında her zaman güncel klinik kılavuzlara danışılmalı ve bireysel hasta değerlendirmesi yapılmalıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 