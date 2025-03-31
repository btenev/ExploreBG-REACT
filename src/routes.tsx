import { createBrowserRouter } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import FAQ from './pages/FAQ';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'faq', element: <FAQ /> },
    ],
  },
]);

export default router;
