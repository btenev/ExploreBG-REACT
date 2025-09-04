import { useState } from "react";
import { toast } from "react-toastify";

import { SubmitButton, ZoomPhoto } from "@components/common";
import {
  useToggleReviewImages,
  useApproveEntityImages,
} from "@hooks/dataHooks/moderation/crossEntityReviewHooks";
import { useGetImageReviewer } from "@hooks/dataHooks/moderation/imageReviewHooks";
import { EntityType, StatusEnum, TPhoto } from "@types";
import { capitalize } from "@utils/mixedUtils";
import { useSessionInfo } from "@utils/sessionUtils";

interface Props {
  entityId: number;
  entityType: EntityType;
  imagesForReview: TPhoto[];
}

const ApproveEntityImages = ({
  entityId,
  entityType,
  imagesForReview,
}: Props) => {
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<number[]>([]);
  const [zoomPhoto, setZoomPhoto] = useState<{
    imageUrl: string;
    index: number;
  } | null>(null);
  const { staffId } = useSessionInfo();

  const imageId = imagesForReview[0]?.id;
  const imageStatus = imagesForReview[0]?.imageStatus !== StatusEnum.approved;
  const enabled = Boolean(imageId && imageStatus);

  const { data: reviewerData } = useGetImageReviewer(String(imageId), enabled);
  const toggleImageReview = useToggleReviewImages();
  const { mutate: approveImages, isPending } = useApproveEntityImages();

  const forReview =
    reviewerData?.reviewerId === null || reviewerData?.reviewerId !== staffId;

  const handleReviewClick = () => {
    if (forReview) {
      // Claim the images for review
      toggleImageReview.mutate({
        entityId: String(entityId),
        imageId: String(imageId),
        entityType: entityType,
        shouldClaim: true,
      });
    } else {
      // Cancel the review
      toggleImageReview.mutate({
        entityId: String(entityId),
        imageId: String(imageId),
        entityType: entityType,
        shouldClaim: false,
      });
    }
  };

  const handleCheckboxClick = (imageId: number) => {
    setSelectedPhotoIds((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleApproveClick = () => {
    if (selectedPhotoIds.length === 0) {
      toast.error("No images selected for approval.");
      return;
    }

    approveImages({
      entityId: String(entityId),
      entityType: entityType,
      imageIds: selectedPhotoIds,
    });
  };

  if (imagesForReview.length === 0) return null;

  return (
    <>
      {imagesForReview.some((i) => i.imageStatus !== StatusEnum.approved) && (
        <button onClick={handleReviewClick} className="review-btn">
          {forReview ? "review" : "cancel"}
        </button>
      )}

      {imagesForReview.map((p, index) => (
        <div key={p.id}>
          {p.imageStatus !== StatusEnum.approved && (
            <input type="checkbox" onChange={() => handleCheckboxClick(p.id)} />
          )}

          <figure style={{ cursor: "pointer" }}>
            <img
              src={p.imageUrl}
              onClick={() => setZoomPhoto({ imageUrl: p.imageUrl, index })}
              width={150}
              height={150}
              alt={capitalize(entityType) + "photo"}
            />
          </figure>
        </div>
      ))}

      {!forReview &&
        imagesForReview.some((i) => i.imageStatus !== StatusEnum.approved) && (
          <SubmitButton
            className="review-btn"
            isSubmitting={isPending}
            onClick={handleApproveClick}
            buttonName="Approve"
          />
        )}

      {zoomPhoto && (
        <ZoomPhoto
          photos={imagesForReview}
          zoomPhoto={zoomPhoto}
          setZoomPhoto={setZoomPhoto}
        />
      )}
    </>
  );
};

export default ApproveEntityImages;
