import { Dispatch, SetStateAction } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import { CommonModal } from "@components/common";
import { TPhoto } from "@types";

interface Props {
  photos: TPhoto[];
  zoomPhoto: { imageUrl: string; index: number };
  setZoomPhoto: Dispatch<
    SetStateAction<{ imageUrl: string; index: number } | null>
  >;
}

const ZoomPhoto = ({ photos, zoomPhoto, setZoomPhoto }: Props) => {
  const handleZoomChange = (index: number, direction: -1 | 1) => {
    const newIndex = (index + direction + photos.length) % photos.length;
    setZoomPhoto({ imageUrl: photos[newIndex].imageUrl, index: newIndex });
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
        <IoIosArrowDropleft
          onClick={() => handleZoomChange(zoomPhoto.index, -1)}
        />
        <IoIosArrowDropright
          onClick={() => handleZoomChange(zoomPhoto.index, 1)}
        />
      </div>
    </CommonModal>
  );
};

export default ZoomPhoto;
