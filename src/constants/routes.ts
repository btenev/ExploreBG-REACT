/** ----------------- API ROUTES ----------------- **/
const USERS = "/users" as const;
const TRAILS = "/trails" as const;
const ACCOMMODATIONS = "/accommodations" as const;
const DESTINATIONS = "/destinations" as const;
const HIKES = "/hikes" as const;
const IMAGES = "/images" as const;
const GPX = "/gpx" as const;
const COMMENTS = "/comments" as const;

/** ----------------- APP ROUTES ----------------- **/
const BASE = "/moderation" as const;
const MOD_TRAILS = `${BASE}${TRAILS}` as const;
const MOD_USERS = `${BASE}${USERS}` as const;
const MOD_IMAGES = `${BASE}${IMAGES}` as const;
const MOD_ACCOMMODATIONS = `${BASE}${ACCOMMODATIONS}` as const;
const MOD_DESTINATIONS = `${BASE}${DESTINATIONS}` as const;
const MOD_GPX = `${BASE}${GPX}` as const;

/* ───────────────────────────────────────────────────────
   APP ROUTES  (React Router paths — use `path` in <Route>)
   ──────────────────────────────────────────────────────── */
export const APP_ROUTES = {
  authentication: "/authentication" as const,

  user: {
    profile: {
      path: `${USERS}/:userId` as const,
      build: (userId: string | number) => `${USERS}/${userId}`,
    },
    myProfile: `${USERS}/my-profile` as const,
  },

  accommodation: {
    index: `${ACCOMMODATIONS}` as const,
    create: `${ACCOMMODATIONS}/create` as const,
    detail: {
      path: `${ACCOMMODATIONS}/:accommodationId` as const,
      build: (accommodationId: string | number) =>
        `${ACCOMMODATIONS}/${accommodationId}`,
    },
  },

  destination: {
    index: `${DESTINATIONS}` as const,
    create: `${DESTINATIONS}/create` as const,
    detail: {
      path: `${DESTINATIONS}/:destinationId` as const,
      build: (destinationId: string | number) =>
        `${DESTINATIONS}/${destinationId}`,
    },
  },

  trail: {
    index: `${TRAILS}` as const,
    create: `${TRAILS}/create` as const,
    detail: {
      path: `${TRAILS}/:trailId` as const,
      build: (trailId: string | number) => `${TRAILS}/${trailId}`,
    },
  },

  hike: {
    index: `${HIKES}` as const,
    create: `${HIKES}/create` as const,
    detail: {
      path: `${HIKES}/:hikeId` as const,
      build: (hikeId: string | number) => `${HIKES}/${hikeId}`,
    },
  },

  moderation: {
    dashboard: `${BASE}/dashboard/entities/waiting-approval/count` as const,
    users: `${MOD_USERS}` as const,
    trailReview: `${MOD_TRAILS}/:trailId/review` as const,
  },
};

// ─────────────────────────────────────────────
// API ROUTES  (backend endpoints — use `.build()` or static value in fetch calls)
// ─────────────────────────────────────────────
export const API_ROUTES = {
  authentication: "/authentication" as const,

  user: {
    byId: (userId: string | number) => `${USERS}/${userId}`,
    myProfile: `${USERS}/my-profile` as const,
  },

  accommodation: {
    root: `${ACCOMMODATIONS}` as const, // GET list / POST create
    random: `${ACCOMMODATIONS}/random` as const,
    select: `${ACCOMMODATIONS}/select` as const,
    byId: (id: string | number) => `${ACCOMMODATIONS}/${id}`,
    mainImage: (id: string | number) => `${ACCOMMODATIONS}/${id}/main-image`,
    like: (id: string | number) => `${ACCOMMODATIONS}/${id}/like`,
    comments: (id: string | number) => `${ACCOMMODATIONS}/${id}/comments`,
    deleteComment: (id: string | number, commentId: string) =>
      `${ACCOMMODATIONS}/${id}/comments/${commentId}`,
  },

  destination: {
    root: `${DESTINATIONS}` as const,
    random: `${DESTINATIONS}/random` as const,
    select: `${DESTINATIONS}/select` as const,
    byId: (id: string | number) => `${DESTINATIONS}/${id}`,
    mainImage: (id: string | number) => `${DESTINATIONS}/${id}/main-image`,
    like: (id: string | number) => `${DESTINATIONS}/${id}/like`,
    comments: (id: string | number) => `${DESTINATIONS}/${id}/comments`,
    deleteComment: (id: string | number, commentId: string) =>
      `${DESTINATIONS}/${id}/comments/${commentId}`,
  },

  trail: {
    root: `${TRAILS}` as const,
    random: `${TRAILS}/random` as const,
    select: `${TRAILS}/select` as const,
    byId: (id: string | number) => `${TRAILS}/${id}`,
    mainImage: (id: string | number) => `${TRAILS}/${id}/main-image`,
    like: (id: string | number) => `${TRAILS}/${id}/like`,
    comments: (id: string | number) => `${TRAILS}/${id}/comments`,
    deleteComment: (id: string | number, commentId: string) =>
      `${TRAILS}/${id}/comments/${commentId}`,
  },

  hike: {
    root: `${HIKES}` as const,
    random: `${HIKES}/random` as const,
    byId: (id: string | number) => `${HIKES}/${id}`,
    like: (id: string | number) => `${HIKES}/${id}/like`,
    comments: (id: string | number) => `${HIKES}/${id}/comments`,
    deleteComment: (id: string | number, commentId: string) =>
      `${HIKES}/${id}/comments/${commentId}`,
  },

  image: {
    updateUserPhoto: `${IMAGES}/user` as const,
    deleteEntityPhotos: (entityId: string | number) =>
      `${IMAGES}/entity/${entityId}`,
  },

  gpx: {
    root: (trailId: string | number) => `${GPX}/trail/${trailId}`,
  },

  comment: {
    byId: (commentId: string) => `${COMMENTS}/${commentId}`,
  },

  utilities: {
    registerEnums: "/utilities/register-enums" as const,
    trailEnums: "/utilities/create/trail-enums" as const,
    accommodationEnums: "/utilities/create/accommodation-enums" as const,
    destinationEnums: "/utilities/create/destination-enums" as const,
  },

  moderation: {
    dashboard: `${BASE}/dashboard/entities/waiting-approval/count` as const,

    user: {
      getAll: `${MOD_USERS}` as const,
      lockUnlockAccount: (id: string | number) =>
        `${MOD_USERS}/${id}/lock-account`,
      updateRole: (id: string | number) => `${MOD_USERS}/${id}/update-role`,
    },

    accommodation: {
      waitingApproval: (query?: string) =>
        `${MOD_ACCOMMODATIONS}/waiting-approval${query ? `?${query}` : ""}`,

      claimImages: (accommodationId: string) =>
        `${MOD_ACCOMMODATIONS}/${accommodationId}/images/claim`,

      unclaimImages: (accommodationId: string) =>
        `${MOD_ACCOMMODATIONS}/${accommodationId}/images/unclaim`,

      approveImages: (accommodationId: string) =>
        `${MOD_ACCOMMODATIONS}/${accommodationId}/images/approve`,
    },

    destination: {
      waitingApproval: (query?: string) =>
        `${MOD_DESTINATIONS}/waiting-approval${query ? `?${query}` : ""}`,

      claimImages: (destinationId: string) =>
        `${MOD_DESTINATIONS}/${destinationId}/images/claim`,

      unclaimImages: (destinationId: string) =>
        `${MOD_DESTINATIONS}/${destinationId}/images/unclaim`,

      approveImages: (destinationId: string) =>
        `${MOD_DESTINATIONS}/${destinationId}/images/approve`,
    },

    trail: {
      waitingApproval: (query?: string) =>
        `${MOD_TRAILS}/waiting-approval${query ? `?${query}` : ""}`,

      getCreatedTrailForReview: {
        path: `${MOD_TRAILS}/:trailId/review` as const, // pattern for React Router
        build: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/review`,
      },

      reviewer: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/reviewer`,

      claim: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/claim`,

      unclaim: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/unclaim`,

      approve: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/approve`,

      claimImages: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/images/claim`,

      unclaimImages: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/images/unclaim`,

      approveImages: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/images/approve`,

      claimGpxFile: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/gpx-file/claim`,

      unclaimGpxFile: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/gpx-file/unclaim`,

      approveGpxFile: (trailId: string | number) =>
        `${MOD_TRAILS}/${trailId}/gpx-file/approve`,
    },

    images: {
      reviewer: (imageId: string | number) =>
        `${MOD_IMAGES}/${imageId}/reviewer`,
    },

    gpx: {
      reviewer: (gpxId: string | number) => `${MOD_GPX}/${gpxId}/reviewer`,
    },
  },
};
