import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./components/common";
import { PUBLIC_ROUTES, MODERATION_ROUTES } from "./constants";
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
  AccommodationDetails,
  DestinationDetails,
  HikeDetails,
  AllTrails,
  AllDestinations,
  AllAccommodations,
  AllHikes,
} from "./pages";

const router = createBrowserRouter([
  {
    // path: '/',
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/faq", element: <FAQ /> },
      { path: PUBLIC_ROUTES.user.myProfile, element: <MyProfile /> },
      { path: PUBLIC_ROUTES.user.getProfile.path, element: <UserProfile /> },
      { path: PUBLIC_ROUTES.trail.create, element: <AllTrails /> },
      { path: PUBLIC_ROUTES.destination.create, element: <AllDestinations /> },
      {
        path: PUBLIC_ROUTES.accommodation.create,
        element: <AllAccommodations />,
      },
      { path: PUBLIC_ROUTES.hike.create, element: <AllHikes /> },
      { path: PUBLIC_ROUTES.hike.details.path, element: <HikeDetails /> },
      { path: PUBLIC_ROUTES.trail.details.path, element: <TrailDetails /> },
      {
        path: PUBLIC_ROUTES.accommodation.details.path,
        element: <AccommodationDetails />,
      },
      {
        path: PUBLIC_ROUTES.destination.details.path,
        element: <DestinationDetails />,
      },
    ],
  },

  { path: PUBLIC_ROUTES.authentication, element: <Authentication /> },
  { path: PUBLIC_ROUTES.trail.create, element: <CreateTrail /> },

  { path: MODERATION_ROUTES.user.getAll, element: <AllUsers /> },
  { path: MODERATION_ROUTES.dashboard, element: <WaitingApproval /> },
  {
    path: MODERATION_ROUTES.trail.getCreatedTrailForReview.path,
    element: <TrailReview />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
