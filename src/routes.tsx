import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from './constants';
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
  AllUsers,
  WaitingApproval,
  TrailReview,
} from './pages';

const router = createBrowserRouter([
  {
    // path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/users/my-profile', element: <MyProfile /> },
      { path: '/users/:userId', element: <UserProfile /> },
      { path: ROUTES.trailDetailsPattern, element: <TrailDetails /> },
    ],
  },

  { path: '/authentication', element: <Authentication /> },
  { path: '/trails/create', element: <CreateTrail /> },

  { path: '/moderation/users', element: <AllUsers /> },
  { path: ROUTES.moderation.dashboard, element: <WaitingApproval /> },
  { path: '/moderation/trails/:trailId/review', element: <TrailReview /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
