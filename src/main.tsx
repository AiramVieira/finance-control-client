import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoadingProvider } from './contexts/LoadingContext'
import { LoadingSpinner } from './components/LoadingSpinner'
import { setupFetchInterceptor, setLoadingContext } from './utils/fetchInterceptor'
import { useLoading } from './contexts/LoadingContext'

// Componente que configura o interceptor de fetch
const AppWithLoading = () => {
  const { startLoading, stopLoading } = useLoading();
  
  // Configurar o interceptor de fetch
  useEffect(() => {
    setLoadingContext({ startLoading, stopLoading });
    setupFetchInterceptor();
  }, [startLoading, stopLoading]);

  return (
    <>
      <App />
      <LoadingSpinner />
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <AppWithLoading />
    </LoadingProvider>
  </StrictMode>,
)
