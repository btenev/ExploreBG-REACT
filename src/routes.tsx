import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/common';
import { Home, FAQ, Authentication, MyProfile } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'users/my-profile', element: <MyProfile /> },
    ],
  },

  { path: '/authentication', element: <Authentication /> },
]);

export default router;
