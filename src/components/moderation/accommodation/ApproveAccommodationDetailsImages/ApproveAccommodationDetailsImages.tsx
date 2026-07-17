import { useState } from "react";

import { AccommodationEnumResponse } from "@api/public";
import CreateAccommodationForm from "@components/accommodation/CreateAccommodationForm/CreateAccommodationForm";
import { ApproveEntityImages } from "@components/common";
import CarouselControls from "@components/moderation/trail/ApproveTrailDetailsImagesAndGpx/CarouselControls/CarouselControls";
import { IAccommodation } from "@types";

interface Props {
  formEnums: AccommodationEnumResponse;
  dataForReview?: IAccommodation;
}

const ApproveAccommodationDetailsImages = ({
  formEnums,
  dataForReview,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    <CreateAccommodationForm
      key="create-accommodation-form"
      formEnums={formEnums}
      dataForReview={dataForReview}
    />,
    ...(dataForReview && dataForReview.images.length > 0
      ? [
          <ApproveEntityImages
            key="approve-accommodation-images"
            entityId={dataForReview.id}
            photoEntityType="accommodation"
            imagesForReview={dataForReview.images}
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
      {dataForReview && dataForReview?.images.length > 0 && (
        <CarouselControls onPrev={handlePrev} onNext={handleNext} />
      )}

      {slides[currentSlide]}
    </>
  );
};

export default ApproveAccommodationDetailsImages;
