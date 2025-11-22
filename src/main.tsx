// MUST be first
import "./sentry";

import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ScrollToTopBtn } from "./components/common";
import { ThemeProvider } from "./context/Theme";
import router from "./routes.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./global-styles/main.scss";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong.</p>}>
      <ThemeProvider>
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
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
