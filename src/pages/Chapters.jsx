import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Filter, Search, TrendingUp, Users, Award } from 'lucide-react';
import ChapterCard from '../components/education/ChapterCard';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import chaptersData from '../data/chapters.json';

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [filteredChapters, setFilteredChapters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // Simulate loading chapters and user progress
    setChapters(chaptersData.chapters);
    setFilteredChapters(chaptersData.chapters);
    
    // Simulate user progress data
    const mockProgress = {
      'fundamentals': { progress: 85, completed: false },
      'developmental-assessment': { progress: 60, completed: false },
      'system-based-semiology': { progress: 40, completed: false },
      'practical-tools': { progress: 90, completed: true },
    };
    setUserProgress(mockProgress);
  }, []);

  useEffect(() => {
    let filtered = chapters;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(chapter =>
        chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(chapter => chapter.difficulty === selectedDifficulty);
    }

    setFilteredChapters(filtered);
  }, [chapters, searchTerm, selectedDifficulty]);

  const handleStartChapter = (chapter) => {
    console.log('Starting chapter:', chapter.id);
    // Navigate to chapter content
  };

  const handleContinueChapter = (chapter) => {
    console.log('Continuing chapter:', chapter.id);
    // Navigate to chapter content at last position
  };

  const difficulties = ['all', 'Başlangıç', 'Orta', 'İleri', 'Pratik'];

  const overallProgress = Object.values(userProgress).reduce((acc, curr) => acc + curr.progress, 0) / Object.keys(userProgress).length || 0;

  const stats = [
    { 
      label: 'Genel İlerleme', 
      value: `${Math.round(overallProgress)}%`, 
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      label: 'Tamamlanan Bölüm', 
      value: Object.values(userProgress).filter(p => p.completed).length, 
      icon: Award,
      color: 'text-green-600 bg-green-50'
    },
    { 
      label: 'Toplam Bölüm', 
      value: chapters.length, 
      icon: BookOpen,
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      label: 'Aktif Öğrenci', 
      value: '2,543', 
      icon: Users,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Eğitim Modülleri
            </h1>
            <p className="text-lg text-gray-600">
              Pediatrik semiyoloji eğitiminizi sistematik olarak ilerletin
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center">
                <div className={`w-12 h-12 ${stat.color.split(' ')[1]} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[0]}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Bölüm ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="input min-w-[120px]"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'Tüm Seviyeler' : difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChapters.map((chapter, index) => {
            const progress = userProgress[chapter.id]?.progress || 0;
            const isCompleted = userProgress[chapter.id]?.completed || false;
            const isLocked = index > 0 && !userProgress[chaptersData.chapters[index - 1]?.id]?.completed && progress === 0;

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ChapterCard
                  chapter={chapter}
                  progress={progress}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  onStart={handleStartChapter}
                  onContinue={handleContinueChapter}
                />
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredChapters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bölüm bulunamadı
            </h3>
            <p className="text-gray-600 mb-6">
              Arama kriterlerinizi değiştirerek tekrar deneyin
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedDifficulty('all');
              }}
            >
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}

        {/* Learning Path Suggestion */}
        {filteredChapters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <Card variant="gradient" className="text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Öğrenme Yolculuğunuz
                </h3>
                <p className="text-gray-600 mb-6">
                  Sistematik bir öğrenme deneyimi için bölümleri sırayla tamamlamanızı öneririz. 
                  Her bölüm bir sonrakinin temelini oluşturur.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button icon={BookOpen}>
                    Önerilen Sırada Devam Et
                  </Button>
                  <Button variant="outline">
                    Öğrenme Planı Oluştur
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chapters; 