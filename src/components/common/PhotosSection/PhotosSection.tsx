import { PhotosProvider } from "@context/Photos";
import { TPhoto } from "@types";

import PhotoActionButtons from "./PhotoActionButtons";
import ThumbnailGallery from "./ThumbnailGallery";

import "./PhotosSection.scss";

interface Props {
  entityId: number;
  photos: TPhoto[];
  canEdit: boolean;
  folder: string;
}

const PhotosSection = ({ entityId, photos, canEdit, folder }: Props) => {
  return (
    <PhotosProvider initialPhotos={photos}>
      <section className="photos-wrapper details-page-section">
        {canEdit && <PhotoActionButtons entityId={entityId} folder={folder} />}

        <ThumbnailGallery entityId={entityId} canEdit={canEdit} />
      </section>
    </PhotosProvider>
  );
};

export default PhotosSection;
