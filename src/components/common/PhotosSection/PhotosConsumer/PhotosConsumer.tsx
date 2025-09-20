import { useEffect } from "react";

import { usePhotosState } from "@context/Photos";
import { EntityType, TPhoto } from "@types";

import PhotoActionButtons from "../PhotoActionButtons";
import ThumbnailGallery from "../ThumbnailGallery";

const PhotosConsumer = ({
  entityId,
  canEdit,
  folder,
  entityType,
  onPhotosChange,
}: {
  entityId: number;
  canEdit: boolean;
  folder: string;
  entityType: EntityType;
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
        entityType={entityType}
      />
    </section>
  );
};
export default PhotosConsumer;
