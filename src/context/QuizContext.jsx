import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Quiz State
const initialState = {
  currentQuiz: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  isQuizActive: false,
  isQuizCompleted: false,
  startTime: null,
  endTime: null,
  userProgress: {},
  achievements: [],
  totalPoints: 0,
  level: 'Acemi',
  streak: 0,
  statistics: {
    totalQuizzes: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    averageScore: 0,
    totalTimeSpent: 0,
    bestStreak: 0,
    achievementsUnlocked: 0
  }
};

// Actions
const QUIZ_ACTIONS = {
  START_QUIZ: 'START_QUIZ',
  ANSWER_QUESTION: 'ANSWER_QUESTION',
  NEXT_QUESTION: 'NEXT_QUESTION',
  COMPLETE_QUIZ: 'COMPLETE_QUIZ',
  RESET_QUIZ: 'RESET_QUIZ',
  UPDATE_PROGRESS: 'UPDATE_PROGRESS',
  UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
  UPDATE_STATISTICS: 'UPDATE_STATISTICS',
  LOAD_USER_DATA: 'LOAD_USER_DATA'
};

// Reducer
function quizReducer(state, action) {
  switch (action.type) {
    case QUIZ_ACTIONS.START_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload.quiz,
        questions: action.payload.questions,
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        isQuizActive: true,
        isQuizCompleted: false,
        startTime: Date.now(),
        endTime: null
      };

    case QUIZ_ACTIONS.ANSWER_QUESTION:
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = {
        questionId: action.payload.questionId,
        selectedAnswer: action.payload.selectedAnswer,
        isCorrect: action.payload.isCorrect,
        timeSpent: action.payload.timeSpent,
        timestamp: Date.now()
      };

      const newScore = action.payload.isCorrect ? state.score + 10 : state.score;

      return {
        ...state,
        answers: newAnswers,
        score: newScore
      };

    case QUIZ_ACTIONS.NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };

    case QUIZ_ACTIONS.COMPLETE_QUIZ:
      const completionTime = Date.now();
      const duration = completionTime - state.startTime;
      const correctAnswers = state.answers.filter(a => a.isCorrect).length;
      const accuracy = (correctAnswers / state.questions.length) * 100;
      
      // Calculate bonus points
      let bonusPoints = 0;
      if (accuracy === 100) bonusPoints += 20; // Perfect score
      if (duration < 60000) bonusPoints += 10; // Speed bonus (under 1 minute)
      
      const finalScore = state.score + bonusPoints;
      
      return {
        ...state,
        isQuizActive: false,
        isQuizCompleted: true,
        endTime: completionTime,
        score: finalScore,
        totalPoints: state.totalPoints + finalScore
      };

    case QUIZ_ACTIONS.RESET_QUIZ:
      return {
        ...state,
        currentQuiz: null,
        questions: [],
        currentQuestionIndex: 0,
        answers: [],
        score: 0,
        isQuizActive: false,
        isQuizCompleted: false,
        startTime: null,
        endTime: null
      };

    case QUIZ_ACTIONS.UPDATE_PROGRESS:
      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [action.payload.chapterId]: action.payload.progress
        }
      };

    case QUIZ_ACTIONS.UNLOCK_ACHIEVEMENT:
      const achievement = {
        ...action.payload,
        unlockedAt: Date.now(),
        id: Date.now().toString()
      };
      
      return {
        ...state,
        achievements: [...state.achievements, achievement],
        totalPoints: state.totalPoints + (achievement.points || 0)
      };

    case QUIZ_ACTIONS.UPDATE_STATISTICS:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          ...action.payload
        }
      };

    case QUIZ_ACTIONS.LOAD_USER_DATA:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}

// Context
const QuizContext = createContext();

// Provider
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('quiz-user-data');
    if (savedData) {
      try {
        const userData = JSON.parse(savedData);
        dispatch({
          type: QUIZ_ACTIONS.LOAD_USER_DATA,
          payload: userData
        });
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    const dataToSave = {
      userProgress: state.userProgress,
      achievements: state.achievements,
      totalPoints: state.totalPoints,
      level: state.level,
      streak: state.streak,
      statistics: state.statistics
    };

    localStorage.setItem('quiz-user-data', JSON.stringify(dataToSave));
  }, [state.userProgress, state.achievements, state.totalPoints, state.level, state.streak, state.statistics]);

  // Quiz Actions
  const startQuiz = (quiz, questions) => {
    dispatch({
      type: QUIZ_ACTIONS.START_QUIZ,
      payload: { quiz, questions }
    });
  };

  const answerQuestion = (questionId, selectedAnswer, isCorrect, timeSpent) => {
    dispatch({
      type: QUIZ_ACTIONS.ANSWER_QUESTION,
      payload: { questionId, selectedAnswer, isCorrect, timeSpent }
    });
  };

  const nextQuestion = () => {
    dispatch({ type: QUIZ_ACTIONS.NEXT_QUESTION });
  };

  const completeQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.COMPLETE_QUIZ });
    
    // Update statistics
    const correctAnswers = state.answers.filter(a => a.isCorrect).length;
    const totalAnswers = state.questions.length;
    const accuracy = (correctAnswers / totalAnswers) * 100;
    
    updateStatistics({
      totalQuizzes: state.statistics.totalQuizzes + 1,
      correctAnswers: state.statistics.correctAnswers + correctAnswers,
      totalAnswers: state.statistics.totalAnswers + totalAnswers,
      averageScore: ((state.statistics.averageScore * state.statistics.totalQuizzes) + accuracy) / (state.statistics.totalQuizzes + 1),
      totalTimeSpent: state.statistics.totalTimeSpent + (Date.now() - state.startTime)
    });

    // Check for achievements
    checkAchievements(correctAnswers, totalAnswers, accuracy);
  };

  const resetQuiz = () => {
    dispatch({ type: QUIZ_ACTIONS.RESET_QUIZ });
  };

  const updateProgress = (chapterId, progress) => {
    dispatch({
      type: QUIZ_ACTIONS.UPDATE_PROGRESS,
      payload: { chapterId, progress }
    });
  };

  const unlockAchievement = (achievement) => {
    dispatch({
      type: QUIZ_ACTIONS.UNLOCK_ACHIEVEMENT,
      payload: achievement
    });
  };

  const updateStatistics = (updates) => {
    dispatch({
      type: QUIZ_ACTIONS.UPDATE_STATISTICS,
      payload: updates
    });
  };

  // Achievement System
  const checkAchievements = (correctAnswers, totalAnswers, accuracy) => {
    const achievements = [];

    // Perfect Score Achievement
    if (accuracy === 100) {
      achievements.push({
        title: 'Mükemmel Puan',
        description: 'Bir quizde %100 doğru yanıt verdiniz!',
        icon: 'trophy',
        points: 50,
        type: 'accuracy'
      });
    }

    // Speed Demon Achievement
    const quizTime = Date.now() - state.startTime;
    if (quizTime < 60000 && accuracy >= 80) {
      achievements.push({
        title: 'Hız Canavarı',
        description: '1 dakika içinde %80+ doğrulukla quiz tamamladınız!',
        icon: 'zap',
        points: 30,
        type: 'speed'
      });
    }

    // First Quiz Achievement
    if (state.statistics.totalQuizzes === 0) {
      achievements.push({
        title: 'İlk Adım',
        description: 'İlk quizinizi tamamladınız!',
        icon: 'star',
        points: 25,
        type: 'milestone'
      });
    }

    // Streak Achievements
    if (state.streak === 3) {
      achievements.push({
        title: 'Kararlı Öğrenci',
        description: '3 gün üst üste quiz çözdünüz!',
        icon: 'flame',
        points: 40,
        type: 'streak'
      });
    }

    // Unlock achievements
    achievements.forEach(achievement => {
      if (!state.achievements.some(a => a.title === achievement.title)) {
        unlockAchievement(achievement);
      }
    });
  };

  // Level System
  const getLevelInfo = (points) => {
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

  const value = {
    // State
    ...state,
    
    // Actions
    startQuiz,
    answerQuestion,
    nextQuestion,
    completeQuiz,
    resetQuiz,
    updateProgress,
    unlockAchievement,
    updateStatistics,
    
    // Utilities
    getLevelInfo,
    
    // Computed values
    currentQuestion: state.questions[state.currentQuestionIndex],
    isLastQuestion: state.currentQuestionIndex === state.questions.length - 1,
    progress: state.questions.length > 0 ? ((state.currentQuestionIndex + 1) / state.questions.length) * 100 : 0,
    accuracy: state.answers.length > 0 ? (state.answers.filter(a => a.isCorrect).length / state.answers.length) * 100 : 0
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};

// Hook
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext; 