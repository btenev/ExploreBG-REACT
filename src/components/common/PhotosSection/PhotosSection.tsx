import { PhotosProvider } from "@context/Photos";
import { EntityType, TPhoto } from "@types";

import PhotosConsumer from "./PhotosConsumer";

import "./PhotosSection.scss";

interface Props {
  entityId: number;
  photos: TPhoto[];
  canEdit: boolean;
  folder: string;
  entityType: EntityType;
  onPhotosChange: (newPhotos: TPhoto[]) => void;
}

const PhotosSection = ({
  entityId,
  photos,
  canEdit,
  folder,
  entityType,
  onPhotosChange,
}: Props) => {
  return (
    <PhotosProvider initialPhotos={photos}>
      <PhotosConsumer
        entityId={entityId}
        canEdit={canEdit}
        folder={folder}
        entityType={entityType}
        onPhotosChange={onPhotosChange}
      />
    </PhotosProvider>
  );
};

export default PhotosSection;
