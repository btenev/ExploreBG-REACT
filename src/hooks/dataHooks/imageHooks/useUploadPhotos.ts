import { useMutation } from "@tanstack/react-query";
import { Dispatch } from "react";
import { toast } from "react-toastify";

import { imagesApi } from "@api/public";
import { ALLOWED_PHOTO_UPLOAD_COUNT } from "@constants";
import { PhotosAction } from "@context/Photos";
import { handleApiError } from "@utils/errorHandlers";

interface UploadPhotosParams {
  entityId: string;
  uploadData: FormData;
  originalFileCount: number;
  previousPhotoCount: number;
}

export const useUploadPhotos = (dispatch: Dispatch<PhotosAction>) => {
  return useMutation({
    mutationKey: ["upload-photos"],
    mutationFn: ({ entityId, uploadData }: UploadPhotosParams) =>
      imagesApi.uploadEntityPhotos(entityId, uploadData),
    onSuccess: (data, { originalFileCount, previousPhotoCount }) => {
      if (!data || data.length === 0) {
        toast.error("No photos were uploaded.");
        return;
      }

      dispatch({ type: "APPEND_PHOTOS", payload: data });

      const totalAfterUpload = previousPhotoCount + originalFileCount;
      const uploadedWord = originalFileCount > 1 ? "photos were" : "photo was";
      const remainingSlots = ALLOWED_PHOTO_UPLOAD_COUNT - previousPhotoCount;

      dispatch({ type: "SET_IS_UPLOADING", payload: false });

      if (totalAfterUpload <= ALLOWED_PHOTO_UPLOAD_COUNT) {
        const limitReached = totalAfterUpload === ALLOWED_PHOTO_UPLOAD_COUNT;
        toast.success(
          limitReached
            ? `Your ${uploadedWord} uploaded successfully. Upload limit reached.`
            : `Your ${uploadedWord} uploaded successfully.`
        );
      } else {
        toast.info(
          `Only ${remainingSlots} photo(s) were uploaded due to the upload limit.`
        );
      }
    },
    onError: handleApiError,
  });
};
