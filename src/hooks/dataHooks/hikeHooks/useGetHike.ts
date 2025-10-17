import { useQuery } from "@tanstack/react-query";

import { hikesApi } from "@api/public";

export const useGetHike = (hikeId: string) => {
  return useQuery({
    queryKey: ["hike", hikeId],
    queryFn: () => hikesApi.getHike(hikeId),
  });
};
