import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number; // For text variant
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  lines = 1,
}) => {
  const baseStyles = 'bg-gray-200 dark:bg-gray-700';
  
  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };

  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={clsx('space-y-2', className)}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            className={clsx(
              baseStyles,
              variants[variant],
              animations[animation],
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={{
              height: height || '1rem',
              width: index === lines - 1 ? '75%' : width || '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        animations[animation],
        className
      )}
      style={style}
    />
  );
};

// Specialized skeleton components for common use cases
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('p-4 border rounded-lg', className)}>
    <div className="flex items-center space-x-3 mb-4">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" height="1.25rem" />
        <Skeleton variant="text" width="40%" height="1rem" className="mt-1" />
      </div>
    </div>
    <Skeleton variant="text" lines={3} />
    <div className="mt-4 flex space-x-2">
      <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
      <Skeleton variant="rectangular" width={80} height={32} className="rounded" />
    </div>
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="w-full">
    {/* Header */}
    <div className="flex space-x-4 mb-4 p-4 border-b">
      {Array.from({ length: columns }, (_, index) => (
        <Skeleton key={index} variant="text" width="120px" height="1.25rem" />
      ))}
    </div>
    
    {/* Rows */}
    {Array.from({ length: rows }, (_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 p-4 border-b">
        {Array.from({ length: columns }, (_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width="120px" height="1rem" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonChart: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx('p-4', className)}>
    <Skeleton variant="text" width="200px" height="1.5rem" className="mb-4" />
    <div className="flex items-end space-x-2 h-40">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton 
          key={index} 
          variant="rectangular" 
          width="40px" 
          height={`${Math.random() * 100 + 20}px`} 
          className="rounded-t"
        />
      ))}
    </div>
    <div className="flex justify-between mt-2">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} variant="text" width="30px" height="0.75rem" />
      ))}
    </div>
  </div>
);

export const SkeletonList: React.FC<{ items?: number }> = ({ items = 6 }) => (
  <div className="space-y-3">
    {Array.from({ length: items }, (_, index) => (
      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
        <Skeleton variant="circular" width={24} height={24} />
        <div className="flex-1">
          <Skeleton variant="text" width="70%" height="1.125rem" />
          <Skeleton variant="text" width="50%" height="0.875rem" className="mt-1" />
        </div>
        <Skeleton variant="rectangular" width={60} height={24} className="rounded" />
      </div>
    ))}
  </div>
);

// Page-specific skeleton components
export const SkeletonScenarioPage: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center space-x-4">
      <Skeleton variant="circular" width={60} height={60} />
      <div>
        <Skeleton variant="text" width="300px" height="2rem" />
        <Skeleton variant="text" width="200px" height="1.25rem" className="mt-2" />
      </div>
    </div>
    
    {/* Content cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SkeletonCard />
      <SkeletonCard />
    </div>
    
    {/* Details section */}
    <div className="space-y-4">
      <Skeleton variant="text" width="250px" height="1.5rem" />
      <Skeleton variant="text" lines={4} />
      <SkeletonList items={4} />
    </div>
  </div>
);

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-6">
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between">
            <Skeleton variant="circular" width={48} height={48} />
            <div className="text-right">
              <Skeleton variant="text" width="60px" height="2rem" />
              <Skeleton variant="text" width="80px" height="1rem" className="mt-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Chart */}
    <SkeletonChart />
    
    {/* Recent items */}
    <div>
      <Skeleton variant="text" width="200px" height="1.5rem" className="mb-4" />
      <SkeletonList items={5} />
    </div>
  </div>
); 