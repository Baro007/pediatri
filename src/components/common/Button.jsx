import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  ...props 
}) => {
  const baseClasses = 'btn inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    danger: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />
      )}
      
      {children}
      
      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 ml-2" />
      )}
    </motion.button>
  );
};

export default Button; 