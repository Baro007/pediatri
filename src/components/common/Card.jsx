import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  variant = 'default',
  padding = 'md',
  ...props 
}) => {
  const baseClasses = 'card';
  
  const variants = {
    default: 'bg-white border-gray-100',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100',
    outline: 'bg-transparent border-2 border-gray-200',
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card alt bileşenleri
const CardHeader = ({ children, className = '' }) => (
  <div className={`border-b border-gray-100 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardSubtitle = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`border-t border-gray-100 pt-4 mt-4 ${className}`}>
    {children}
  </div>
);

// Alt bileşenleri Card'a ekle
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 