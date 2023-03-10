import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import Lottie from 'lottie-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import error from './assets/error.json';
import loading from './assets/loading.json';
import { GlobalStyle } from './styles/GlobalStyle';
import { Loading } from './styles/LoadingStyle';

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
      <ErrorBoundary onReset={reset} fallbackRender={() => <Lottie animationData={error} />}>
        <React.Suspense
          fallback={
            <Loading>
              <Lottie animationData={loading} />
            </Loading>
          }
        >
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <BrowserRouter>
                <GlobalStyle />
                <App />
                <Toaster
                  toastOptions={{
                    style: {
                      color: '#fff',
                      backgroundColor: '#000',
                    },
                  }}
                  position="bottom-center"
                  reverseOrder={true}
                />
              </BrowserRouter>
            </React.StrictMode>
          </QueryClientProvider>
        </React.Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);
