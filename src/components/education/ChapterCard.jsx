import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Star, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const ChapterCard = ({ 
  chapter, 
  isLocked = false, 
  isCompleted = false,
  progress = 0,
  onStart,
  onContinue 
}) => {
  const getIcon = (iconName) => {
    const icons = {
      stethoscope: BookOpen,
      users: BookOpen,
      heart: BookOpen,
      calculator: BookOpen
    };
    return icons[iconName] || BookOpen;
  };

  const IconComponent = getIcon(chapter.icon);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Başlangıç': 'text-green-600 bg-green-50',
      'Orta': 'text-yellow-600 bg-yellow-50',
      'İleri': 'text-red-600 bg-red-50',
      'Pratik': 'text-blue-600 bg-blue-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card 
        hover={!isLocked} 
        className={`relative overflow-hidden ${isLocked ? 'opacity-75' : ''}`}
      >
        {/* Status indicators */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          {isCompleted && (
            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success-600" />
            </div>
          )}
          {isLocked && (
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          )}
        </div>

        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-16 h-16 bg-${chapter.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
            <IconComponent className={`w-8 h-8 text-${chapter.color}-600`} />
          </div>
          <div className="flex-1">
            <Card.Title className="mb-2">{chapter.title}</Card.Title>
            <Card.Subtitle className="text-sm">{chapter.subtitle}</Card.Subtitle>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {chapter.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{chapter.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{chapter.topics?.length || 0} konu</span>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(chapter.difficulty)}`}>
            {chapter.difficulty}
          </div>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">İlerleme</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="progress-bar h-2">
              <div 
                className="progress-fill transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <Card.Footer className="pt-4">
          {isLocked ? (
            <Button 
              variant="outline" 
              disabled 
              className="w-full"
            >
              Önceki bölümü tamamlayın
            </Button>
          ) : isCompleted ? (
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex-1"
                onClick={() => onContinue?.(chapter)}
              >
                Tekrar Et
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                className="flex-1"
                icon={ArrowRight}
                iconPosition="right"
                onClick={() => onContinue?.(chapter)}
              >
                Devam Et
              </Button>
            </div>
          ) : progress > 0 ? (
            <Button 
              variant="primary" 
              className="w-full"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => onContinue?.(chapter)}
            >
              Kaldığın Yerden Devam Et
            </Button>
          ) : (
            <Button 
              variant="primary" 
              className="w-full"
              icon={BookOpen}
              onClick={() => onStart?.(chapter)}
            >
              Başla
            </Button>
          )}
        </Card.Footer>

        {/* Achievement badge */}
        {isCompleted && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute -top-2 -right-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white fill-current" />
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default ChapterCard; 