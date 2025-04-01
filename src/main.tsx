import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './global-styles/main.scss';
import router from './routes.tsx';
import { ProvideTheme } from './context/ProvideTheme.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvideTheme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ProvideTheme>
  </StrictMode>
);
