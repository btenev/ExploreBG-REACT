/** ----------------- PUBLIC ROUTES ----------------- **/
const USERS = '/users' as const;
const TRAILS = '/trails' as const;
const ACCOMMODATIONS = '/accommodations' as const;
const DESTINATIONS = '/destinations' as const;
const HIKES = '/hikes' as const;
const IMAGES = '/images' as const;
const GPX = '/gpx' as const;
const COMMENTS = '/comments' as const;

export const PUBLIC_ROUTES = {
  authentication: '/authentication' as const, // simple, no build needed

  user: {
    getProfile: {
      path: `${USERS}/:userId` as const, // pattern for React Router
      build: (userId: string | number) => `${USERS}/${userId}`, // dynamic
    },
    myProfile: `${USERS}/my-profile` as const, // simple route
  },

  accommodation: {
    random: `${ACCOMMODATIONS}/random` as const, // simple

    availableAccommodation: `${ACCOMMODATIONS}/select` as const, // simple

    favoriteStatus: (accommodationId: string | number) =>
      `${ACCOMMODATIONS}/${accommodationId}/like`,

    accommodationComments: (accommodationId: string | number) =>
      `${ACCOMMODATIONS}/${accommodationId}/comments`,

    deleteAccommodationComment: (accommodationId: string, commentId: string) =>
      `${ACCOMMODATIONS}/${accommodationId}/comments/${commentId}`,
  },

  destination: {
    random: `${DESTINATIONS}/random` as const, // simple

    availableDestination: `${DESTINATIONS}/select` as const, // simple

    favoriteStatus: (destinationId: string | number) =>
      `${DESTINATIONS}/${destinationId}/like` as const,

    destinationComments: (destinationId: string | number) =>
      `${DESTINATIONS}/${destinationId}/comments`,

    deleteDestinationComment: (destinationId: string, commentId: string) =>
      `${DESTINATIONS}/${destinationId}/comments/${commentId}`,
  },

  trail: {
    random: `${TRAILS}/random` as const, // simple`

    create: `${TRAILS}/create` as const, // simple

    details: {
      path: `${TRAILS}/:trailId` as const, // dynamic
      build: (trailId: string | number) => `${TRAILS}/${trailId}`,
    },

    favoriteTrail: (trailId: string | number) => `${TRAILS}/${trailId}/like`,

    updateMainTrailPhoto: (trailId: string | number) => `${TRAILS}/${trailId}/main-image`,

    trailComments: (trailId: string | number) => `${TRAILS}/${trailId}/comments`,

    deleteTrailComment: (trailId: string, commentId: string) =>
      `${TRAILS}/${trailId}/comments/${commentId}`,
  },

  hike: {
    random: `${HIKES}/random` as const, // simple
  },

  image: {
    updateUserPhoto: `${IMAGES}/user` as const, // simple

    deleteEntityPhotos: (entityId: string | number) => `${IMAGES}/entity/${entityId}`,
  },

  gpx: {
    gpxUpload: (trailId: string | number) => `${GPX}/${trailId}/upload`,
  },

  comment: {
    updateComment: (commentId: string) => `${COMMENTS}/${commentId}`, // simple
  },

  utilities: {
    registerEnums: '/utilities/register-enums' as const, // simple

    trailEnums: '/utilities/create/trail-enums' as const, // simple
  },
};

/** ----------------- MODERATION ROUTES ----------------- **/
const BASE = '/moderation' as const;
const MOD_TRAILS = `${BASE}${TRAILS}` as const;
const MOD_USERS = `${BASE}${USERS}` as const;
const MOD_IMAGES = `${BASE}${IMAGES}` as const;
const MOD_ACCOMMODATIONS = `${BASE}${ACCOMMODATIONS}` as const;
const MOD_DESTINATIONS = `${BASE}${DESTINATIONS}` as const;
const MOD_GPX = `${BASE}${GPX}` as const;

export const MODERATION_ROUTES = {
  dashboard: '/moderation/dashboard/entities/waiting-approval/count' as const,

  user: {
    getAll: `${BASE}${USERS}` as const,

    lockUnlockAccount: (userId: string | number) => `${MOD_USERS}/${userId}/lock-account`,

    updateRole: (userId: string | number) => `${MOD_USERS}/${userId}/update-role`,
  },

  accommodation: {
    getWaitingApprovalAccommodations: (query?: string) =>
      `${MOD_ACCOMMODATIONS}/waiting-approval${query ? `?${query}` : ''}`,

    claimForReviewAccommodationImages: (accommodationId: string) =>
      `${MOD_ACCOMMODATIONS}/${accommodationId}/images/claim`,

    unclaimForReviewAccommodationImages: (accommodationId: string) =>
      `${MOD_ACCOMMODATIONS}/${accommodationId}/images/unclaim`,

    approveAccommodationImages: (accommodationId: string) =>
      `${MOD_ACCOMMODATIONS}/${accommodationId}/images/approve`,
  },

  destination: {
    getWaitingApprovalDestinations: (query?: string) =>
      `${MOD_DESTINATIONS}/waiting-approval${query ? `?${query}` : ''}`,

    claimForReviewDestinationImages: (destinationId: string) =>
      `${MOD_DESTINATIONS}/${destinationId}/images/claim`,

    unclaimForReviewDestinationImages: (destinationId: string) =>
      `${MOD_DESTINATIONS}/${destinationId}/images/unclaim`,

    approveDestinationImages: (destinationId: string) =>
      `${MOD_DESTINATIONS}/${destinationId}/images/approve`,
  },

  trail: {
    getWaitingApprovalTrails: (query?: string) =>
      `${MOD_TRAILS}/waiting-approval${query ? `?${query}` : ''}`,

    getCreatedTrailForReview: {
      path: `${MOD_TRAILS}/:trailId/review` as const, // pattern for React Router
      build: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/review`,
    },

    getTrailReviewer: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/reviewer`,

    claimTrailForReview: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/claim`,

    unclaimTrailForReview: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/unclaim`,

    approveTrailDetails: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/approve`,

    claimTrailImagesForReview: (trailId: string | number) =>
      `${MOD_TRAILS}/${trailId}/images/claim`,

    unclaimTrailImagesForReview: (trailId: string | number) =>
      `${MOD_TRAILS}/${trailId}/images/unclaim`,

    approveTrailImagesForReview: (trailId: string | number) =>
      `${MOD_TRAILS}/${trailId}/images/approve`,

    approveTrailGpxfile: (trailId: string | number) => `${MOD_TRAILS}/${trailId}/gpx-file/approve`,
  },

  images: {
    reviewer: (imageId: string | number) => `${MOD_IMAGES}/${imageId}/reviewer`,
  },

  gpx: {
    reviewer: (gpxId: string | number) => `${MOD_GPX}/${gpxId}/reviewer`,
  },
};
