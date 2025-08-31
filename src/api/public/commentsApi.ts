import { PUBLIC_ROUTES } from "@constants";
import { IComment } from "@types";

import { ApiClient } from "../base";

const apiClient = new ApiClient();

export const commentsApi = {
  updateComment: (
    commentId: string,
    data: { message: string }
  ): Promise<IComment> => {
    return apiClient.put(PUBLIC_ROUTES.comment.updateComment(commentId), data);
  },
};
