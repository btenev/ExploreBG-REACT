import { useState } from 'react';

import { usePhotosDispatch, usePhotosState } from '../../../context/PhotosContextProvider';

import LoadingSpinner from '../LoadingSpinner';
import ZoomPhoto from '../ZoomPhoto';

import { ALLOWED_PHOTO_UPLOAD_COUNT } from '../../../constants';

import { useUpdateMainTrailPhoto } from '../../../hooks/dataHooks/trailHooks/useUpdateMainTrailPhoto';

interface Props {
  entityId: number;
  canEdit: boolean;
}

const ThumbnailGallery = ({ entityId, canEdit }: Props) => {
  const [zoomPhoto, setZoomPhoto] = useState<{ imageUrl: string; index: number } | null>(null);
  const { photos, isUploading, photosForDelete, changeMainClick, isDeletePhotosClick } =
    usePhotosState();
  const dispatch = usePhotosDispatch();

  const { mutate: updateMainPhoto } = useUpdateMainTrailPhoto(dispatch);

  const handleCheckboxClick = (id: number) => {
    photosForDelete.includes(id)
      ? dispatch({ type: 'SET_PHOTOS_FOR_DELETE', payload: photosForDelete.filter((p) => p != id) })
      : dispatch({ type: 'SET_PHOTOS_FOR_DELETE', payload: [...photosForDelete, id] });
  };

  const handleChangeMainPhoto = (id: number) => {
    updateMainPhoto({
      trailId: entityId.toString(),
      data: { imageId: id.toString() },
    });

    dispatch({ type: 'SET_CHANGE_MAIN_CLICK', payload: false });
  };

  return (
    <>
      {isUploading && (
        <div className="photos-wrapper__spinner" style={{ display: isUploading ? 'flex' : 'none' }}>
          <LoadingSpinner
            width={photos.length == 0 ? '5rem' : undefined}
            height={photos.length == 0 ? '5rem' : undefined}
            fontSize={photos.length == 0 ? '0.65rem' : undefined}
            uploadOrDelete={photosForDelete.length > 0 ? 'Deleting' : 'Uploading'}
          />
        </div>
      )}

      {photos.length == 0 && !isUploading && (
        <p>
          <span className="asterisk">*</span>
          <em>{`You may upload a maximum of ${ALLOWED_PHOTO_UPLOAD_COUNT} photos.`}</em>
        </p>
      )}

      {photos.length > 0 && (
        <div className="photos-wrapper__photos" style={{ marginTop: canEdit ? '2rem' : '0' }}>
          {photos.some((p) => p.imageStatus?.toLocaleLowerCase() == 'review') && (
            <p>{`There are currently ${
              photos.filter((p) => p.imageStatus?.toLocaleLowerCase() == 'review').length
            } images in review!`}</p>
          )}

          {photos
            .filter((p) => p.imageStatus?.toLocaleLowerCase() != 'review')
            .map((p, index) => (
              <div key={p.id} className="photos-wrapper__photos__img">
                {p.isMain && canEdit && (
                  <span className="photos-wrapper__photos__img__span-main">Main</span>
                )}
                {!p.isMain && canEdit && changeMainClick && (
                  <span
                    onClick={() => handleChangeMainPhoto(p.id)}
                    className="photos-wrapper__photos__img__span-set-main"
                  >
                    Set main
                  </span>
                )}

                {isDeletePhotosClick && (
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxClick(p.id)}
                    checked={photosForDelete.includes(p.id)}
                    className="photos-wrapper__photos__img__checkbox"
                  />
                )}

                <figure>
                  <img
                    src={p.imageUrl}
                    onClick={() => setZoomPhoto({ imageUrl: p.imageUrl, index })}
                    width={150}
                    height={150}
                    alt="Trail photo"
                    className={p.isMain && canEdit ? 'photos-wrapper__photos__img__main' : ''}
                  />
                </figure>
              </div>
            ))}

          {zoomPhoto && (
            <ZoomPhoto photos={photos} zoomPhoto={zoomPhoto} setZoomPhoto={setZoomPhoto} />
          )}

          {canEdit && (
            <p className="photos-wrapper__photos__limit-message">
              <span className="asterisk">*</span>
              <em>
                {`You have ${ALLOWED_PHOTO_UPLOAD_COUNT - photos.length} image slots remaining`}
              </em>
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ThumbnailGallery;
