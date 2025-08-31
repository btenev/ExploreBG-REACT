import { useQuery } from "@tanstack/react-query";

import { moderationDashboardApi } from "@api/moderation";

export const useGetWaitingApprovalCount = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: () => moderationDashboardApi.getWaitingApprovalCount(),
    enabled,
  });
};
