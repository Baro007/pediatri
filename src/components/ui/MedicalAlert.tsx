import React from 'react';
import { clsx } from 'clsx';

interface MedicalAlertProps {
  children?: React.ReactNode;
  message?: string;
  className?: string;
}

export const RedFlag: React.FC<MedicalAlertProps> = ({ children, message, className }) => {
  const content = message || children;
  
  return (
    <div className={clsx('p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg', className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-red-600 text-lg font-bold">🚩</span>
        </div>
        <div>
          <h4 className="font-bold text-sm text-red-800 mb-1">Red Flag</h4>
          <div className="text-red-700 text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};

export const ClinicalPearl: React.FC<MedicalAlertProps> = ({ children, message, className }) => {
  const content = message || children;
  
  return (
    <div className={clsx('p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg', className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-blue-600 text-lg font-bold">💎</span>
        </div>
        <div>
          <h4 className="font-bold text-sm text-blue-800 mb-1">Klinik İnci</h4>
          <div className="text-blue-700 text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};

export const DeepDive: React.FC<MedicalAlertProps> = ({ children, message, className }) => {
  const content = message || children;
  
  return (
    <div className={clsx('p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg', className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-indigo-600 text-lg font-bold">🔍</span>
        </div>
        <div>
          <h4 className="font-bold text-sm text-indigo-800 mb-1">Derinlemesine Bakış</h4>
          <div className="text-indigo-700 text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};

interface LegalWarningProps {
  children?: React.ReactNode;
  message?: string;
  className?: string;
}

export const LegalWarning: React.FC<LegalWarningProps> = ({ children, message, className }) => {
  const content = message || children;
  
  return (
    <div className={clsx('p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg', className)}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-amber-600 text-lg font-bold">⚠️</span>
        </div>
        <div>
          <h4 className="font-bold text-amber-800 mb-1">Yasal ve Tıbbi Uyarı</h4>
          <div className="text-amber-700 text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
}; 