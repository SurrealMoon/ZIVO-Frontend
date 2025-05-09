import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingOverlay from '@/components/LoadingOverlay';

const queryClient = new QueryClient();

export const ZivoQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Örneğin, ilk fetch veya preload işlemleri varsa
    const initialize = async () => {
      // İleride global preloadler buraya yazılabilir
      await new Promise((res) => setTimeout(res, 300)); // min. yükleme süresi örneği
      setIsReady(true);
    };

    initialize();
  }, []);

  if (!isReady) {
    return <LoadingOverlay />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
