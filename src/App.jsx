import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Chapters from './pages/Chapters';
import About from './pages/About';
import ChapterDetail from './pages/ChapterDetail';
import Quiz from './pages/Quiz';

function App() {
  return (
    <QuizProvider>
      <Router>
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
