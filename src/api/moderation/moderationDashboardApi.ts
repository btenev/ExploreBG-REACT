import { ApiClient } from '../apiClient';

const apiClient = new ApiClient();
const baseUrl = '/moderation/dashboard';

export interface WaitingApprovalCountResponse {
  accommidations: number;
  destinations: number;
  trails: number;
}

export const moderationDashboardApi = {
  getWaitingApprovalCount: (): Promise<WaitingApprovalCountResponse> =>
    apiClient.get(`${baseUrl}/entities/waiting-approval/count`),
};
