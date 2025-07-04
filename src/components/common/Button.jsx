import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'btn tap-highlight-transparent';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-3 text-sm min-h-[44px]',
    lg: 'btn-lg',
    xl: 'px-8 py-4 text-lg min-h-[52px]',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const loadingClasses = loading ? 'opacity-75 cursor-wait' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${loadingClasses} ${className}`;
  
  // Touch event handlers for better mobile interaction
  const handleTouchStart = (e) => {
    e.currentTarget.style.transform = 'scale(0.98)';
  };
  
  const handleTouchEnd = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    
    onClick?.(e);
  };
  
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
      
      <span className={`flex items-center justify-center space-x-2 ${loading ? 'opacity-0' : ''}`}>
        {Icon && iconPosition === 'left' && (
          <Icon className="w-5 h-5 flex-shrink-0" />
        )}
        {children && <span className="font-medium">{children}</span>}
        {Icon && iconPosition === 'right' && (
          <Icon className="w-5 h-5 flex-shrink-0" />
        )}
      </span>
    </motion.button>
  );
};

export default Button; 