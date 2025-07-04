import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import About from './pages/About';
import ChapterDetail from './pages/ChapterDetail';
import Quiz from './pages/Quiz';

// GitHub Pages base URL configuration
const getBasename = () => {
  // Production GitHub Pages URL
  if (window.location.hostname === 'baro007.github.io') {
    return '/pediatri';
  }
  // Development or other deployment
  return '';
};

// Component to handle URL redirects from 404 page
const RedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for redirect parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    
    if (redirectPath) {
      // Clean up the URL and navigate to the intended path
      const cleanPath = redirectPath.startsWith('/') ? redirectPath : '/' + redirectPath;
      navigate(cleanPath, { replace: true });
    }
  }, [navigate]);

  return null;
};

function App() {
  return (
    <QuizProvider>
      <Router basename={getBasename()}>
        <RedirectHandler />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/chapters/:chapterId" element={<ChapterDetail />} />
            <Route path="/quiz/:chapterId" element={<Quiz />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </QuizProvider>
  );
}

export default App;
