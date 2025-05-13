import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/common';
import { Authentication, CreateTrail, FAQ, Home, MyProfile, NotFound } from './pages';

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
  { path: '/trails/create', element: <CreateTrail /> },

  { path: '*', element: <NotFound /> },
]);

export default router;
