import { ChangeEvent } from "react";
import { MdAddAPhoto } from "react-icons/md";

import { ALLOWED_PHOTO_UPLOAD_COUNT } from "@constants";
import { usePhotosDispatch, usePhotosState } from "@context/Photos";
import { useUploadPhotos } from "@hooks/dataHooks/imageHooks";
import { compressImages } from "@utils/imageCompressor";

interface Props {
  entityId: number;
  folder: string;
}

const UploadPhotos = ({ entityId, folder }: Props) => {
  const { photos } = usePhotosState();
  const dispatch = usePhotosDispatch();

  const { mutate: uploadPhotos } = useUploadPhotos(dispatch);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files && files.length > 0) {
      dispatch({ type: "SET_IS_UPLOADING", payload: true });

      const originalFileCount = files.length;

      const data = { folder };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      const remainingUploadSlots = ALLOWED_PHOTO_UPLOAD_COUNT - photos.length;

      const filesForUpload = Array.from(files).slice(0, remainingUploadSlots);
      const compressedFiles = await compressImages(filesForUpload);

      compressedFiles.forEach((file) => {
        if (file) {
          formData.append(`file`, file);
        }
      });

      uploadPhotos({
        entityId: entityId.toString(),
        uploadData: formData,
        originalFileCount,
        previousPhotoCount: photos.length,
      });
    }
  };

  return (
    <form className="photos-wrapper__buttons__form">
      <label htmlFor="photos-file">
        <span>
          Upload Photos <MdAddAPhoto style={{ fontSize: "1.25rem" }} />
        </span>
      </label>
      <input
        onChange={handleFileUpload}
        type="file"
        accept="image/*"
        multiple
        id="photos-file"
      />
    </form>
  );
};

export default UploadPhotos;
