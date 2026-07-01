import { API_ROUTES } from "@constants";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export interface WaitingApprovalCountResponse {
  accommidations: number;
  destinations: number;
  trails: number;
}

export const moderationDashboardApi = {
  getWaitingApprovalCount: (): Promise<WaitingApprovalCountResponse> =>
    apiClient.get(API_ROUTES.moderation.dashboard),
};
