import { PhotosProvider } from "@context/Photos";
import { EntityType, TPhoto } from "@types";

import PhotoActionButtons from "./PhotoActionButtons";
import ThumbnailGallery from "./ThumbnailGallery";

import "./PhotosSection.scss";

interface Props {
  entityId: number;
  photos: TPhoto[];
  canEdit: boolean;
  folder: string;
  entityType: EntityType;
}

const PhotosSection = ({
  entityId,
  photos,
  canEdit,
  folder,
  entityType,
}: Props) => {
  return (
    <PhotosProvider initialPhotos={photos}>
      <section className="photos-wrapper details-page-section">
        {canEdit && <PhotoActionButtons entityId={entityId} folder={folder} />}

        <ThumbnailGallery
          entityId={entityId}
          canEdit={canEdit}
          entityType={entityType}
        />
      </section>
    </PhotosProvider>
  );
};

export default PhotosSection;
