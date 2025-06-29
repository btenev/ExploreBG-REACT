import { useMutation } from '@tanstack/react-query';
import { Dispatch } from 'react';

import { toast } from 'react-toastify';

import { IComment } from '../../types';
import { CommentDataDto } from '../formHooks/useCommentForm';
import { commentsApi } from '../../api/commentsApi';

import { handleApiError } from '../../utils/errorHandlers';

export const useUpdateComment = (handleNewComment: Dispatch<IComment>) => {
  return useMutation({
    mutationKey: ['updateComment'],
    mutationFn: ({ commentId, data }: { commentId: string; data: CommentDataDto }) =>
      commentsApi.updateComment(commentId, data),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Failed to update comment.');
        return;
      }

      handleNewComment(data);
      toast.success('Comment updated successfully.');
    },
    onError: handleApiError,
  });
};
