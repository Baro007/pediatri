import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Trophy, CheckCircle, PlayCircle, FileText, Users, Play } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import chaptersData from '../data/chapters.json';

const ChapterDetail = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [completedTopics, setCompletedTopics] = useState(new Set());

  useEffect(() => {
    // Bölüm verisini bul
    const foundChapter = chaptersData.find(ch => ch.id === chapterId);
    setChapter(foundChapter);

    // localStorage'dan tamamlanan konuları yükle
    const savedProgress = localStorage.getItem(`chapter-${chapterId}-progress`);
    if (savedProgress) {
      setCompletedTopics(new Set(JSON.parse(savedProgress)));
    }
  }, [chapterId]);

  const handleTopicComplete = (topicId) => {
    const newCompleted = new Set(completedTopics);
    newCompleted.add(topicId);
    setCompletedTopics(newCompleted);
    
    // localStorage'a kaydet
    localStorage.setItem(`chapter-${chapterId}-progress`, JSON.stringify([...newCompleted]));
  };

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Bölüm yükleniyor...</p>
        </div>
      </div>
    );
  }

  const progress = chapter.topics ? (completedTopics.size / chapter.topics.length) * 100 : 0;

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: <BookOpen size={16} /> },
    { id: 'content', label: 'İçerik', icon: <FileText size={16} /> },
    { id: 'quiz', label: 'Quiz', icon: <Trophy size={16} /> },
    { id: 'discussion', label: 'Tartışma', icon: <Users size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="bg-white/80 backdrop-blur-sm border-b border-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/chapters"
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">{chapter.title}</h1>
                <p className="text-gray-600 mt-1">{chapter.description}</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">İlerleme</div>
                <div className="text-lg font-semibold text-blue-600">{Math.round(progress)}%</div>
              </div>
              <div className="w-16 h-16 relative">
                <svg className="transform -rotate-90 w-full h-full">
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="28" 
                    stroke="#e5e7eb" 
                    strokeWidth="4" 
                    fill="none"
                  />
                  <circle 
                    cx="50%" 
                    cy="50%" 
                    r="28" 
                    stroke="#2563eb" 
                    strokeWidth="4" 
                    fill="none"
                    strokeDasharray={`${progress * 1.76} 176`}
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-600">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white/50 border-b border-blue-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Chapter Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{chapter.estimatedTime}</div>
                  <div className="text-sm text-gray-600">Tahmini Süre</div>
                </Card>
                
                <Card className="p-6 text-center">
                  <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{chapter.topics?.length || 0}</div>
                  <div className="text-sm text-gray-600">Konu Sayısı</div>
                </Card>
                
                <Card className="p-6 text-center">
                  <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{chapter.difficulty}</div>
                  <div className="text-sm text-gray-600">Zorluk Seviyesi</div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Hızlı Başlangıç</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => setActiveTab('content')}
                      icon={BookOpen}
                    >
                      İçeriği İncele
                    </Button>
                    <Link to={`/quiz/${chapterId}`} className="block">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        icon={Play}
                      >
                        Quiz'e Başla
                      </Button>
                    </Link>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Bu Bölümde</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Temel kavramlar ve ilkeler</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Pratik uygulama örnekleri</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>İnteraktif quiz sorları</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Klinik senaryolar</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {chapter.topics?.map((topic, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        completedTopics.has(topic.id) 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {completedTopics.has(topic.id) ? (
                          <CheckCircle size={16} />
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                        <p className="text-sm text-gray-600">{topic.duration || '15 dk'}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant={completedTopics.has(topic.id) ? "success" : "primary"}
                      size="sm"
                      onClick={() => handleTopicComplete(topic.id)}
                      disabled={completedTopics.has(topic.id)}
                    >
                      {completedTopics.has(topic.id) ? (
                        <>
                          <CheckCircle size={16} />
                          <span>Tamamlandı</span>
                        </>
                      ) : (
                        <>
                          <PlayCircle size={16} />
                          <span>Başla</span>
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="text-gray-700 space-y-4">
                      {topic.content?.introduction && (
                        <p>{topic.content.introduction}</p>
                      )}
                      
                      {topic.content?.keyPoints && (
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Ana Noktalar:</h4>
                          <ul className="space-y-1">
                            {topic.content.keyPoints.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-600">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 text-center">
                <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {chapter.title} - Quiz
                </h3>
                <p className="text-gray-600 mb-6">
                  Bu bölümde öğrendiklerinizi test edin ve bilginizi pekiştirin.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {chapter.quizQuestions?.length || 5}
                    </div>
                    <div className="text-sm text-gray-600">Soru Sayısı</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.ceil((chapter.quizQuestions?.length || 5) * 1.5)}
                    </div>
                    <div className="text-sm text-gray-600">Tahmini Süre (dk)</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {(chapter.quizQuestions?.length || 5) * 10}
                    </div>
                    <div className="text-sm text-gray-600">Maksimum Puan</div>
                  </div>
                </div>

                <Link to={`/quiz/${chapterId}`}>
                  <Button size="lg" icon={Play} className="bg-yellow-600 hover:bg-yellow-700">
                    Quiz'e Başla
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}

          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 text-center">
                <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tartışma Forumu</h3>
                <p className="text-gray-600 mb-6">
                  Bu bölümle ilgili sorularınızı sorun, deneyimlerinizi paylaşın ve diğer kullanıcılarla etkileşime geçin.
                </p>
                <Button variant="primary">
                  <Users size={16} />
                  <span>Tartışmaya Katıl</span>
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChapterDetail; 