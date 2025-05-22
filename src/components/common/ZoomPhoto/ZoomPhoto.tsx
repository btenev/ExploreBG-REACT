import { Dispatch, SetStateAction } from 'react';

import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import { TPhoto } from '../../../types';

import CommonModal from '../CommonModal';

interface Props {
  photos: TPhoto[];
  zoomPhoto: { imageUrl: string; index: number };
  setZoomPhoto: Dispatch<SetStateAction<{ imageUrl: string; index: number } | null>>;
}

const ZoomPhoto = ({ photos, zoomPhoto, setZoomPhoto }: Props) => {
  const handlePrev = (index: number) => {
    index > 0
      ? setZoomPhoto({ imageUrl: photos[index - 1].imageUrl, index: index - 1 })
      : setZoomPhoto({ imageUrl: photos[photos.length - 1].imageUrl, index: photos.length - 1 });
  };

  const handleNext = (index: number) => {
    index < photos.length - 1
      ? setZoomPhoto({ imageUrl: photos[index + 1].imageUrl, index: index + 1 })
      : setZoomPhoto({ imageUrl: photos[0].imageUrl, index: 0 });
  };

  return (
    <CommonModal>
      <figure className="photos-wrapper__photos__zoom-img">
        <span onClick={() => setZoomPhoto(null)}>X</span>
        <img
          src={zoomPhoto.imageUrl}
          width={500}
          height={500}
          alt="Trail photo"
          className="photos-wrapper__photos__zoom-img__img"
        />
      </figure>

      <div className="photos-wrapper__photos__arrows">
        <IoIosArrowDropleft onClick={() => handlePrev(zoomPhoto.index)} />
        <IoIosArrowDropright onClick={() => handleNext(zoomPhoto.index)} />
      </div>
    </CommonModal>
  );
};

export default ZoomPhoto;
