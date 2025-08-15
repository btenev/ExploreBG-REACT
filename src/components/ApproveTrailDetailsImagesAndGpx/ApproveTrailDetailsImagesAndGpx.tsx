import { useState } from 'react';

import { TrailEnumsResponse } from '../../api/utilitiesApi';
import { IHut, IPlace, ITrail } from '../../types';

import { ApproveEntityImages, CarouselControls } from '../common';
import ApproveTrailGpx from '../ApproveTrailGpx';
import CreateTrailForm from '../CreateTrailForm';

interface Props {
  formEnums: TrailEnumsResponse;
  availableAccommodations: IHut[];
  availableDestinations: IPlace[];
  dataForReview?: ITrail;
}

const ApproveTrailDetailsImagesAndGpx = ({
  formEnums,
  availableAccommodations,
  availableDestinations,
  dataForReview,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    <CreateTrailForm
      key="create-trail-form"
      formEnums={formEnums}
      availableAccommodations={availableAccommodations}
      availableDestinations={availableDestinations}
      dataForReview={dataForReview}
    />,
    ...(dataForReview && dataForReview.images.length > 0
      ? [
          <ApproveEntityImages
            key="approve-trail-images"
            entityId={dataForReview.id}
            entityType="trail"
            imagesForReview={dataForReview.images}
          />,
        ]
      : []),
    ...(dataForReview && dataForReview.gpxFile
      ? [
          <ApproveTrailGpx
            key="approve-trail-gpx"
            trailId={dataForReview.id}
            gpxFile={dataForReview.gpxFile}
          />,
        ]
      : []),
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev == 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev == slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {dataForReview && (dataForReview?.images.length > 0 || dataForReview?.gpxFile) && (
        <CarouselControls onPrev={handlePrev} onNext={handleNext} />
      )}

      {slides[currentSlide]}
    </>
  );
};

export default ApproveTrailDetailsImagesAndGpx;
