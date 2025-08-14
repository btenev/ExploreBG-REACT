export const ALLOWED_PHOTO_UPLOAD_COUNT = 10;

/*Map*/
export const MAP_FUNCTIONALITIES_BACKGR_COLOR = '#d3d3d3ba';
export const BG_GPS_COORDINATES: [number, number] = [42.7249925, 25.4833039];
export const DEFAULT_MAP_ZOOM = 7;

/*Pagination*/
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_CARDS_PER_PAGE = 3;

export const DEFAULT_SORT_BY = 'id';
export const SORT_DIR_DESC = 'DESC';

/*Navigation routes*/
export const ROUTES = {
  trailDetails: (params: { trailId: string | number }) => `/trails/${params.trailId}`,
  trailDetailsPattern: '/trails/:trailId',
  moderation: {
    dashboard: '/moderation/dashboard/waiting-approval/count',
    trail: {
      claimTrailForReview: (params: { trailId: string | number }) =>
        `/moderation/trails/${params.trailId}/gpx-file/claim`,
      claimTrailForReviewPattern: '/moderation/trails/:trailId/gpx-file/claim',

      unclaimTrailForReview: (params: { trailId: string | number }) =>
        `/moderation/trails/${params.trailId}/gpx-file/unclaim`,
      unclaimTrailForReviewPattern: '/moderation/trails/:trailId/gpx-file/unclaim',

      approveTrailGpxfile: (params: { trailId: string | number }) =>
        `/moderation/trails/${params.trailId}/gpx-file/approve`,
      approveTrailGpxfilePattern: '/moderation/trails/:trailId/gpx-file/approve',
    },
    gpx: {
      reviewer: (params: { gpxId: string | number }) => `/moderation/gpx/${params.gpxId}/reviewer`,
      reviewerPattern: '/moderation/gpx/:gpxId/reviewer',
    },
  },
} as const;
