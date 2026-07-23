import { useState } from "react";

import { DestinationEnumsResponse } from "@api/public";
import { ApproveEntityImages } from "@components/common";
import CreateDestinationForm from "@components/destination/CreateDestinationForm";
import CarouselControls from "@components/moderation/trail/ApproveTrailDetailsImagesAndGpx/CarouselControls";
import { IDestination } from "@types";

interface Props {
  formEnums: DestinationEnumsResponse;
  dataForReview: IDestination;
}

const ApproveDestinationDetailsImages = ({
  formEnums,
  dataForReview,
}: Props) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    <CreateDestinationForm
      key="create-destination-form"
      formEnums={formEnums}
      dataForReview={dataForReview}
    />,
    ...(dataForReview && dataForReview.images.length > 0
      ? [
          <ApproveEntityImages
            key="approve-destination-images"
            entityId={dataForReview.id}
            photoEntityType="destination"
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

export default ApproveDestinationDetailsImages;
