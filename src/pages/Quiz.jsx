import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ArrowLeft, 
  Trophy, 
  Star, 
  Clock, 
  Target, 
  CheckCircle, 
  XCircle,
  Award,
  Zap,
  RefreshCw
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import QuizCard from '../components/gamification/QuizCard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import chaptersData from '../data/chapters.json';

const Quiz = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const quiz = useQuiz();
  const [chapter, setChapter] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find chapter
    const foundChapter = chaptersData.find(ch => ch.id === chapterId);
    if (foundChapter) {
      setChapter(foundChapter);
    } else {
      navigate('/chapters');
      return;
    }

    setIsLoading(false);
  }, [chapterId, navigate]);

  const handleStartQuiz = () => {
    if (!chapter?.quizQuestions) return;
    
    quiz.startQuiz(chapter, chapter.quizQuestions);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerQuestion = (answerIndex, isCorrect) => {
    const timeSpent = Date.now() - questionStartTime;
    const currentQuestion = quiz.currentQuestion;
    
    quiz.answerQuestion(currentQuestion.id, answerIndex, isCorrect, timeSpent);
    
    // Auto-advance after 2 seconds
    setTimeout(() => {
      if (quiz.isLastQuestion) {
        quiz.completeQuiz();
      } else {
        quiz.nextQuestion();
        setQuestionStartTime(Date.now());
      }
    }, 2000);
  };

  const handleRestartQuiz = () => {
    quiz.resetQuiz();
    handleStartQuiz();
  };

  const handleBackToChapter = () => {
    navigate(`/chapters/${chapterId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Quiz yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Bulunamadı</h2>
          <p className="text-gray-600 mb-6">Seçilen bölüm için quiz mevcut değil.</p>
          <Button onClick={() => navigate('/chapters')}>
            Bölümlere Dön
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToChapter}
                icon={ArrowLeft}
              >
                Geri
              </Button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {chapter.title} - Quiz
                </h1>
                <p className="text-gray-600">{chapter.description}</p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Quiz Start Screen */}
          {!quiz.isQuizActive && !quiz.isQuizCompleted && (
            <motion.div
              key="start-screen"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-2xl mx-auto p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-blue-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Quiz'e Başlamaya Hazır mısınız?
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Bu quiz {chapter.quizQuestions?.length || 10} sorudan oluşmakta ve 
                  tahmini {Math.ceil((chapter.quizQuestions?.length || 10) * 1.5)} dakika sürecek.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">
                      {chapter.quizQuestions?.length || 10}
                    </div>
                    <div className="text-sm text-gray-600">Soru</div>
                  </div>
                  
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.ceil((chapter.quizQuestions?.length || 10) * 1.5)}
                    </div>
                    <div className="text-sm text-gray-600">Dakika</div>
                  </div>
                  
                  <div className="text-center">
                    <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">
                      {(chapter.quizQuestions?.length || 10) * 10}
                    </div>
                    <div className="text-sm text-gray-600">Maksimum Puan</div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleStartQuiz}
                  icon={Play}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!chapter.quizQuestions || chapter.quizQuestions.length === 0}
                >
                  Quiz'e Başla
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Quiz Questions */}
          {quiz.isQuizActive && quiz.currentQuestion && (
            <motion.div
              key={`question-${quiz.currentQuestionIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <QuizCard
                question={quiz.currentQuestion}
                onAnswer={handleAnswerQuestion}
                questionNumber={quiz.currentQuestionIndex + 1}
                totalQuestions={quiz.questions.length}
                showExplanation={true}
              />
            </motion.div>
          )}

          {/* Quiz Results */}
          {quiz.isQuizCompleted && (
            <motion.div
              key="results-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <Card className="text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Quiz Tamamlandı!
                </h2>
                
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {quiz.accuracy.toFixed(0)}%
                </div>
                
                <p className="text-xl text-gray-600 mb-6">
                  {quiz.answers.filter(a => a.isCorrect).length} / {quiz.questions.length} doğru yanıt
                </p>

                <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                  <Star className="w-5 h-5" />
                  <span className="font-semibold">{quiz.score} puan kazandınız!</span>
                </div>
              </Card>

              {/* Detailed Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Quiz İstatistikleri
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-600">Doğru Yanıtlar</span>
                      </div>
                      <span className="font-semibold text-green-600">
                        {quiz.answers.filter(a => a.isCorrect).length}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-gray-600">Yanlış Yanıtlar</span>
                      </div>
                      <span className="font-semibold text-red-600">
                        {quiz.answers.filter(a => !a.isCorrect).length}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-600">Toplam Süre</span>
                      </div>
                      <span className="font-semibold text-blue-600">
                        {Math.ceil((quiz.endTime - quiz.startTime) / 1000)}s
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span className="text-gray-600">Ortalama Süre</span>
                      </div>
                      <span className="font-semibold text-yellow-600">
                        {Math.ceil((quiz.endTime - quiz.startTime) / (1000 * quiz.questions.length))}s/soru
                      </span>
                    </div>
                  </div>
                </Card>

                {/* New Achievements */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Yeni Rozetler
                  </h3>
                  
                  <div className="space-y-3">
                    {quiz.achievements
                      .filter(a => Date.now() - a.unlockedAt < 10000) // Last 10 seconds
                      .map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200"
                        >
                          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-yellow-900">{achievement.title}</h4>
                            <p className="text-sm text-yellow-700">{achievement.description}</p>
                          </div>
                          <div className="text-yellow-600 font-medium">
                            +{achievement.points}
                          </div>
                        </motion.div>
                      ))}
                    
                    {quiz.achievements.filter(a => Date.now() - a.unlockedAt < 10000).length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <p>Bu quizde yeni rozet kazanamadınız</p>
                        <p className="text-sm">Daha iyi performans göstererek rozetler kazanın!</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={handleRestartQuiz}
                  icon={RefreshCw}
                >
                  Tekrar Dene
                </Button>
                
                <Button
                  variant="primary"
                  onClick={handleBackToChapter}
                  icon={ArrowLeft}
                >
                  Bölüme Dön
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz; 