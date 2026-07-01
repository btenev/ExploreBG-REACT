import { API_ROUTES } from "@constants";
import { IComment } from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const commentsApi = {
  updateComment: (
    commentId: string,
    data: { message: string },
  ): Promise<IComment> => {
    return apiClient.put(API_ROUTES.comment.byId(commentId), data);
  },
};
