import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/common';
import { Home, FAQ, Authentication } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'faq', element: <FAQ /> },
    ],
  },

  { path: '/authentication', element: <Authentication /> },
]);

export default router;
