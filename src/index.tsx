import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import error from './assets/error.json';
import loading from './assets/loading.json';
import { GlobalStyle } from './styles/GlobalStyle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <>
            <Lottie animationData={error} />
            <button onClick={() => resetErrorBoundary()}>다시시도</button>
          </>
        )}
      >
        <React.Suspense fallback={<Lottie animationData={loading} />}>
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <BrowserRouter>
                <GlobalStyle />
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </QueryClientProvider>
        </React.Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
