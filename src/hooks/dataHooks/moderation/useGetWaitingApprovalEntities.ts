import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import {
  accommodationReviewApi,
  destinationReviewApi,
  trailReviewApi,
  WaitingApprovalEntityResponse,
  WaitingApprovalTrailsResponse,
} from '../../../api/moderation';
import { CollectionType } from '../../../types';

type ApiMapper = {
  trails: (query: string) => Promise<WaitingApprovalTrailsResponse>;
  accommodations: (query: string) => Promise<WaitingApprovalEntityResponse>;
  destinations: (query: string) => Promise<WaitingApprovalEntityResponse>;
};

const apiMapper: ApiMapper = {
  trails: trailReviewApi.getWaitingApprovalTrails,
  accommodations: accommodationReviewApi.getWaitingApprovalAccommodations,
  destinations: destinationReviewApi.getWaitingDestinations,
};

type Params<C extends CollectionType> = {
  enabled: boolean;
  collection: C | null;
  query: string;
  keyDeps?: unknown[];
};

export function useGetWaitingApprovalEntities<C extends keyof ApiMapper>({
  enabled,
  collection,
  query,
  keyDeps = [],
}: Params<C>) {
  return useQuery({
    queryKey: ['waitingApproval', collection, query, ...keyDeps],
    queryFn: () => {
      if (!collection) {
        toast.error('Collection type is not specified.');
        return;
      }
      return apiMapper[collection](query);
    },
    enabled: enabled && collection !== null,
    staleTime: 60 * 60 * 1000,
  });
}
