import { useEffect } from "react";

import { usePhotosState } from "@context/Photos";
import { PhotoEntityType, TPhoto } from "@types";

import PhotoActionButtons from "../PhotoActionButtons";
import ThumbnailGallery from "../ThumbnailGallery";

const PhotosConsumer = ({
  entityId,
  canEdit,
  folder,
  photoEntityType,
  onPhotosChange,
}: {
  entityId: number;
  canEdit: boolean;
  folder: string;
  photoEntityType: PhotoEntityType;
  onPhotosChange: (newPhotos: TPhoto[]) => void;
}) => {
  const { photos } = usePhotosState();

  // Notify parent whenever photos change
  useEffect(() => {
    onPhotosChange(photos);
  }, [photos, onPhotosChange]);

  return (
    <section className="photos-wrapper details-page-section">
      {canEdit && <PhotoActionButtons entityId={entityId} folder={folder} />}
      <ThumbnailGallery
        entityId={entityId}
        canEdit={canEdit}
        photoEntityType={photoEntityType}
      />
    </section>
  );
};
export default PhotosConsumer;
