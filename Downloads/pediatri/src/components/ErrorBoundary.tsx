import React, { Component, ReactNode } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Here you could send the error to an error reporting service
    // Example: sendErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-2xl w-full">
            <div className="text-center">
              <div className="text-6xl mb-4">😞</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Beklenmedik Bir Hata Oluştu
              </h1>
              <p className="text-gray-600 mb-6">
                Özür dileriz, uygulamamızda bir sorun oluştu. Lütfen sayfayı yenilemeyi deneyin.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3 justify-center">
                  <Button onClick={this.handleReset} variant="primary">
                    Tekrar Dene
                  </Button>
                  <Button onClick={this.handleReload} variant="secondary">
                    Sayfayı Yenile
                  </Button>
                </div>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-8 text-left">
                    <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                      Hata Detayları (Sadece Geliştirici Modu)
                    </summary>
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h3 className="font-medium text-red-900 mb-2">Hata Mesajı:</h3>
                      <pre className="text-sm text-red-800 whitespace-pre-wrap mb-4">
                        {this.state.error.message}
                      </pre>
                      
                      <h3 className="font-medium text-red-900 mb-2">Stack Trace:</h3>
                      <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-auto max-h-48">
                        {this.state.error.stack}
                      </pre>
                      
                      {this.state.errorInfo && (
                        <>
                          <h3 className="font-medium text-red-900 mb-2 mt-4">Component Stack:</h3>
                          <pre className="text-xs text-red-700 whitespace-pre-wrap overflow-auto max-h-48">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </>
                      )}
                    </div>
                  </details>
                )}
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// Hook for functional components to handle async errors
export const useErrorHandler = () => {
  const [, setState] = React.useState();

  return React.useCallback((error: Error) => {
    console.error('Async error caught:', error);
    // Force a re-render to trigger error boundary
    setState(() => {
      throw error;
    });
  }, []);
};

// Utility function for safe async operations
export const safeAsyncOperation = async <T,>(
  operation: () => Promise<T>,
  fallbackValue: T,
  onError?: (error: Error) => void
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    console.error('Safe async operation failed:', errorObj);
    
    if (onError) {
      onError(errorObj);
    }
    
    return fallbackValue;
  }
}; 