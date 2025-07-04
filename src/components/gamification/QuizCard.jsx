import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Lightbulb,
  Target,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const QuizCard = ({ 
  question, 
  onAnswer, 
  onNext, 
  onPrevious,
  questionNumber, 
  totalQuestions,
  timeLimit = null,
  showExplanation = false 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [showHint, setShowHint] = useState(false);

  React.useEffect(() => {
    if (timeLimit && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered, timeLimit]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    onAnswer?.(null, false, true); // null answer, incorrect, timed out
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === question.correctAnswer;
    onAnswer?.(answerIndex, isCorrect, false);
  };

  const getAnswerStyle = (index) => {
    if (!isAnswered) {
      return 'border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer';
    }
    
    if (index === question.correctAnswer) {
      return 'border-success-500 bg-success-50 text-success-800';
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'border-accent-500 bg-accent-50 text-accent-800';
    }
    
    return 'border-gray-200 bg-gray-50 text-gray-500';
  };

  const getAnswerIcon = (index) => {
    if (!isAnswered) return null;
    
    if (index === question.correctAnswer) {
      return <CheckCircle className="w-5 h-5 text-success-600" />;
    }
    
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return <XCircle className="w-5 h-5 text-accent-600" />;
    }
    
    return null;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary-600" />
            <span className="text-sm font-medium text-gray-600">
              Soru {questionNumber} / {totalQuestions}
            </span>
          </div>
          
          {question.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              question.difficulty === 'Kolay' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {question.difficulty}
            </span>
          )}
        </div>

        {timeLimit && (
          <div className={`flex items-center space-x-2 ${
            timeLeft <= 10 ? 'text-accent-600' : 'text-gray-600'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {question.question}
        </h2>
        
        {question.context && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-blue-900 mb-2">Klinik Senaryo:</h3>
            <p className="text-blue-800">{question.context}</p>
          </div>
        )}

        {question.image && (
          <div className="mb-4">
            <img 
              src={question.image} 
              alt="Soru görseli" 
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>

      {/* Answers */}
      <div className="space-y-3 mb-6">
        {question.answers.map((answer, index) => (
          <motion.div
            key={index}
            whileHover={!isAnswered ? { scale: 1.02 } : {}}
            whileTap={!isAnswered ? { scale: 0.98 } : {}}
          >
            <div
              className={`p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ${getAnswerStyle(index)}`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  !isAnswered ? 'border-gray-300' : 
                  index === question.correctAnswer ? 'border-success-600 bg-success-600 text-white' :
                  index === selectedAnswer ? 'border-accent-600 bg-accent-600 text-white' :
                  'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{answer}</span>
              </div>
              {getAnswerIcon(index)}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      {question.hint && (
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            icon={Lightbulb}
            onClick={() => setShowHint(!showHint)}
            className="mb-3"
          >
            {showHint ? 'İpucunu Gizle' : 'İpucu Göster'}
          </Button>
          
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800">{question.hint}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Explanation */}
      <AnimatePresence>
        {isAnswered && showExplanation && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className={`rounded-lg p-4 border-2 ${
              selectedAnswer === question.correctAnswer 
                ? 'bg-success-50 border-success-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start space-x-2">
                <HelpCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  selectedAnswer === question.correctAnswer 
                    ? 'text-success-600' 
                    : 'text-blue-600'
                }`} />
                <div>
                  <h3 className={`font-medium mb-2 ${
                    selectedAnswer === question.correctAnswer 
                      ? 'text-success-900' 
                      : 'text-blue-900'
                  }`}>
                    Açıklama:
                  </h3>
                  <p className={
                    selectedAnswer === question.correctAnswer 
                      ? 'text-success-800' 
                      : 'text-blue-800'
                  }>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          icon={ArrowLeft}
          onClick={onPrevious}
          disabled={questionNumber === 1}
        >
          Önceki
        </Button>

        <div className="flex space-x-3">
          {!isAnswered ? (
            <Button disabled>
              Cevap Seçin
            </Button>
          ) : questionNumber === totalQuestions ? (
            <Button
              variant="success"
              icon={Target}
              onClick={onNext}
            >
              Testi Bitir
            </Button>
          ) : (
            <Button
              icon={ArrowRight}
              iconPosition="right"
              onClick={onNext}
            >
              Sonraki Soru
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuizCard; 