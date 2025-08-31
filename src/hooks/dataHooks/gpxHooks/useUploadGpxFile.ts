import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

import { gpxApi } from "@api/public";
import { handleApiError } from "@utils/errorHandlers";

interface UploadGpxFileParams {
  trailId: string;
  gpxFile: FormData;
}

export const useUploadGpxFile = (
  setGpxFile: Dispatch<SetStateAction<string | null>>,
  setCreationDate: Dispatch<SetStateAction<string>>
) => {
  return useMutation({
    mutationKey: ["upload-gpx-file"],
    mutationFn: ({ trailId, gpxFile }: UploadGpxFileParams) =>
      gpxApi.uploadGpxFile(trailId, gpxFile),
    onSuccess: (data) => {
      if (!data || !data.gpxUrl) {
        throw new Error("No GPX file was uploaded.");
      }

      setGpxFile(data.gpxUrl);
      console.log("GPX file uploaded successfully:", data.gpxUrl);

      setCreationDate(data.creationDate);

      toast.success("Your GPX file was uploaded successfully.");
    },
    onError: handleApiError,
  });
};
