import { createBrowserRouter } from "react-router-dom";

import CreateAccommodation from "pages/CreateAccommodation";

import { Layout } from "./components/common";
import { APP_ROUTES } from "./constants";
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
  CreateHike,
} from "./pages";

const router = createBrowserRouter([
  {
    // path: '/',
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/faq", element: <FAQ /> },
      { path: APP_ROUTES.user.myProfile, element: <MyProfile /> },
      { path: APP_ROUTES.user.profile.path, element: <UserProfile /> },
      { path: APP_ROUTES.trail.index, element: <AllTrails /> },
      { path: APP_ROUTES.destination.index, element: <AllDestinations /> },
      {
        path: APP_ROUTES.accommodation.index,
        element: <AllAccommodations />,
      },
      { path: APP_ROUTES.hike.index, element: <AllHikes /> },
      { path: APP_ROUTES.hike.detail.path, element: <HikeDetails /> },
      { path: APP_ROUTES.trail.detail.path, element: <TrailDetails /> },
      {
        path: APP_ROUTES.accommodation.detail.path,
        element: <AccommodationDetails />,
      },
      {
        path: APP_ROUTES.destination.detail,
        element: <DestinationDetails />,
      },
    ],
  },

  { path: APP_ROUTES.authentication, element: <Authentication /> },
  { path: APP_ROUTES.trail.create, element: <CreateTrail /> },
  { path: APP_ROUTES.hike.create, element: <CreateHike /> },
  { path: APP_ROUTES.accommodation.create, element: <CreateAccommodation /> },
  { path: APP_ROUTES.moderation.users, element: <AllUsers /> },
  { path: APP_ROUTES.moderation.dashboard, element: <WaitingApproval /> },
  {
    path: APP_ROUTES.moderation.trailReview,
    element: <TrailReview />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
