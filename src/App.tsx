import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const SystemExaminationPage = lazy(() => import('./pages/SystemExaminationPage'));
const ClinicalScenariosPage = lazy(() => import('./pages/ClinicalScenariosPage'));
const DevelopmentTrackingPage = lazy(() => import('./pages/DevelopmentTrackingPage'));
const AssessmentFundamentalsPage = lazy(() => import('./pages/AssessmentFundamentalsPage'));
const QuickReferencePage = lazy(() => import('./pages/QuickReferencePage'));

// Placeholder component for references page
const ReferencesPage = () => (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">📚 Kaynaklar</h1>
    <div className="space-y-4">
      <p className="text-gray-600">Bu sayfa geliştiriliyor...</p>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="font-semibold text-blue-900 mb-2">🔗 Gelecek Özellikler:</h2>
        <ul className="text-blue-800 space-y-1">
          <li>• Güncel pediatri rehberleri</li>
          <li>• Bilimsel makaleler</li>
          <li>• Eğitim videoları</li>
          <li>• Harici kaynaklar</li>
        </ul>
      </div>
    </div>
  </div>
);

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      <p className="text-lg font-medium text-gray-600">Yükleniyor...</p>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="development" element={<DevelopmentTrackingPage />} />
                <Route path="scenarios" element={<ClinicalScenariosPage />} />
                <Route path="quick-reference" element={<QuickReferencePage />} />
                <Route path="systems" element={<SystemExaminationPage />} />
                <Route path="systems/:systemId" element={<SystemExaminationPage />} />
                <Route path="assessment" element={<AssessmentFundamentalsPage />} />
                <Route path="references" element={<ReferencesPage />} />
              </Route>
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
