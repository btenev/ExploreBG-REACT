import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components/common';
import {
  Home,
  FAQ,
  Authentication,
  MyProfile,
  CreateTrail,
  TrailDetails,
  NotFound,
  UserProfile,
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'users/my-profile', element: <MyProfile /> },
      { path: 'users/:userId', element: <UserProfile /> },
      { path: 'trails/:trailId', element: <TrailDetails /> },
    ],
  },

  { path: '/authentication', element: <Authentication /> },
  { path: '/trails/create', element: <CreateTrail /> },

  { path: '*', element: <NotFound /> },
]);

export default router;
