import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, ErrorBoundary } from '@suspensive/react';
import { GlobalPortal, GlobalStyles } from 'tosslib';
import { Routes } from './pages/Routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <GlobalPortal.Provider>
          <ErrorBoundary
            fallback={({ error }) => (
              <div role="alert">
                <h2>상품 데이터를 불러오는 중 오류가 발생했습니다</h2>
                <details style={{ whiteSpace: 'pre-wrap' }}>{error.message}</details>
              </div>
            )}
          >
            <Suspense fallback={<div>적금 상품 불러오는 중...</div>}>
              <Routes />
            </Suspense>
          </ErrorBoundary>
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </>
  );
}
