import { IComment } from '../types';

import { ApiClient } from './apiClient';

const baseCommentUrl = '/comments';

const apiClient = new ApiClient();

export const commentsApi = {
  updateComment: (commentId: string, data: { message: string }): Promise<IComment> => {
    return apiClient.put(`${baseCommentUrl}/${commentId}`, data);
  },
};
