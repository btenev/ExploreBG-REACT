import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './global-styles/main.scss';

import router from './routes.tsx';
import { ProvideTheme } from './context/ProvideTheme.tsx';
import { ScrollToTopBtn } from './components/common';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvideTheme>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* Scroll-to-top button available on all pages */}
        <ScrollToTopBtn />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ProvideTheme>
  </StrictMode>
);
