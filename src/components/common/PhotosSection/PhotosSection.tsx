import './PhotosSection.scss';

import { TPhoto } from '../../../types';

import { PhotosContextProvider } from '../../../context/PhotosContextProvider';

import PhotoActionButtons from '../PhotoActionButtons';
import ThumbnailGallery from '../ThumbnailGallery';

interface Props {
  entityId: number;
  photos: TPhoto[];
  canEdit: boolean;
  folder: string;
}

const PhotosSection = ({ entityId, photos, canEdit, folder }: Props) => {
  return (
    <PhotosContextProvider initialPhotos={photos}>
      <section className="photos-wrapper details-page-section">
        {canEdit && <PhotoActionButtons entityId={entityId} folder={folder} />}

        <ThumbnailGallery entityId={entityId} canEdit={canEdit} />
      </section>
    </PhotosContextProvider>
  );
};

export default PhotosSection;
