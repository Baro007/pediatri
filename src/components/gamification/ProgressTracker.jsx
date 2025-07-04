import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  TrendingUp, 
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
  Zap
} from 'lucide-react';
import Card from '../common/Card';

const ProgressTracker = ({ userProgress, achievements = [] }) => {
  const calculateOverallProgress = () => {
    if (!userProgress || Object.keys(userProgress).length === 0) return 0;
    
    const totalProgress = Object.values(userProgress).reduce((acc, curr) => acc + curr.progress, 0);
    return Math.round(totalProgress / Object.keys(userProgress).length);
  };

  const calculateTotalPoints = () => {
    return achievements.reduce((acc, curr) => acc + (curr.points || 0), 0);
  };

  const getNextLevel = (points) => {
    const levels = [
      { name: 'Acemi', minPoints: 0, maxPoints: 99, color: 'gray' },
      { name: 'Öğrenci', minPoints: 100, maxPoints: 299, color: 'blue' },
      { name: 'Pratisyen', minPoints: 300, maxPoints: 599, color: 'green' },
      { name: 'Uzman', minPoints: 600, maxPoints: 999, color: 'purple' },
      { name: 'Master', minPoints: 1000, maxPoints: 1999, color: 'yellow' },
      { name: 'Grandmaster', minPoints: 2000, maxPoints: Infinity, color: 'red' }
    ];

    const currentLevel = levels.find(level => points >= level.minPoints && points <= level.maxPoints);
    const nextLevelIndex = levels.findIndex(level => level === currentLevel) + 1;
    const nextLevel = levels[nextLevelIndex] || levels[levels.length - 1];

    return { currentLevel, nextLevel, levels };
  };

  const overallProgress = calculateOverallProgress();
  const totalPoints = calculateTotalPoints();
  const { currentLevel, nextLevel } = getNextLevel(totalPoints);

  const recentAchievements = achievements
    .filter(a => a.unlockedAt)
    .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt))
    .slice(0, 3);

  const stats = [
    {
      label: 'Genel İlerleme',
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Toplam Puan',
      value: totalPoints,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Rozetler',
      value: achievements.filter(a => a.unlockedAt).length,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Seviye',
      value: currentLevel?.name || 'Acemi',
      icon: Trophy,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const streakDays = 7; // Mock data
  const studyTime = 125; // Mock data (minutes)

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="text-center">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Seviye İlerlemesi</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${currentLevel?.color}-100 text-${currentLevel?.color}-800`}>
              {currentLevel?.name}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {totalPoints} / {nextLevel?.minPoints || currentLevel?.maxPoints} puan
              </span>
              <span className="text-gray-600">
                Sonraki seviye: {nextLevel?.name}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className={`h-3 rounded-full bg-gradient-to-r from-${currentLevel?.color}-400 to-${currentLevel?.color}-600`}
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((totalPoints - currentLevel?.minPoints) / 
                    ((nextLevel?.minPoints || currentLevel?.maxPoints) - currentLevel?.minPoints)) * 100}%` 
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            
            <p className="text-sm text-gray-600">
              {nextLevel?.minPoints ? 
                `${nextLevel.minPoints - totalPoints} puan daha kazanın!` :
                'Maksimum seviyeye ulaştınız! 🎉'
              }
            </p>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <span>Son Kazanılan Rozetler</span>
              </Card.Title>
            </Card.Header>
            
            <div className="space-y-3">
              {recentAchievements.length > 0 ? (
                recentAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                  >
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      {achievement.icon === 'trophy' && <Trophy className="w-5 h-5 text-yellow-600" />}
                      {achievement.icon === 'star' && <Star className="w-5 h-5 text-yellow-600" />}
                      {achievement.icon === 'target' && <Target className="w-5 h-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-900">{achievement.title}</h4>
                      <p className="text-sm text-yellow-700">{achievement.description}</p>
                      <p className="text-xs text-yellow-600">
                        {new Date(achievement.unlockedAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                    <div className="text-yellow-600 font-medium">
                      +{achievement.points}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>Henüz rozet kazanmadınız</p>
                  <p className="text-sm">Eğitimleri tamamlayarak rozetler kazanın!</p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Study Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <Card.Header>
              <Card.Title className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Çalışma İstatistikleri</span>
              </Card.Title>
            </Card.Header>
            
            <div className="space-y-4">
              {/* Study Streak */}
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Çalışma Serisi</h4>
                    <p className="text-sm text-orange-700">Ardışık gün sayısı</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-orange-600">{streakDays}</div>
              </div>

              {/* Study Time */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">Bu Hafta</h4>
                    <p className="text-sm text-green-700">Toplam çalışma süresi</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600">{studyTime}dk</div>
              </div>

              {/* Weekly Goal */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900">Haftalık Hedef</h4>
                  <span className="text-sm text-blue-700">180dk</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <motion.div 
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(studyTime / 180) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  {Math.round((studyTime / 180) * 100)}% tamamlandı
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressTracker; 