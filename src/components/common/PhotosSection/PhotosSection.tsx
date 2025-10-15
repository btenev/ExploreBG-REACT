import { PhotosProvider } from "@context/Photos";
import { PhotoEntityType, TPhoto } from "@types";

import PhotosConsumer from "./PhotosConsumer";

import "./PhotosSection.scss";

interface Props {
  entityId: number;
  photos: TPhoto[];
  canEdit: boolean;
  folder: string;
  photoEntityType: PhotoEntityType;
  onPhotosChange: (newPhotos: TPhoto[]) => void;
}

const PhotosSection = ({
  entityId,
  photos,
  canEdit,
  folder,
  photoEntityType,
  onPhotosChange,
}: Props) => {
  return (
    <PhotosProvider initialPhotos={photos}>
      <PhotosConsumer
        entityId={entityId}
        canEdit={canEdit}
        folder={folder}
        photoEntityType={photoEntityType}
        onPhotosChange={onPhotosChange}
      />
    </PhotosProvider>
  );
};

export default PhotosSection;
