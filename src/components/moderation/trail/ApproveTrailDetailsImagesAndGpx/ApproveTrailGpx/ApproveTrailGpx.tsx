import { useState } from "react";

import { SubmitButton } from "@components/common";
import { Map } from "@components/map";
import { useGetGpxReviewer } from "@hooks/dataHooks/moderation/gpxReviewHooks";
import {
  useToggleReviewGpx,
  useApproveGpxFile,
} from "@hooks/dataHooks/moderation/trailReviewHooks";
import { ITrackInfo, StatusEnum, TGpxFile } from "@types";
import { useSessionInfo } from "@utils/sessionUtils";

import "./ApproveTrailGpx.scss";

interface Props {
  trailId: number;
  gpxFile: TGpxFile;
}

const ApproveTrailGpx = ({ trailId, gpxFile }: Props) => {
  const [loadingAction, setLoadingAction] = useState<
    "approve" | "reject" | null
  >(null);
  const [, setTrackInfo] = useState<ITrackInfo | null>(null);
  const { staffId } = useSessionInfo();

  const gpxId = gpxFile.id;
  const gpxStatus = gpxFile.gpxStatus !== StatusEnum.approved;
  const enabled = Boolean(gpxId && gpxStatus);

  const { data: reviewerData } = useGetGpxReviewer(String(gpxId), enabled);

  const forReview =
    reviewerData?.reviewerId === null || reviewerData?.reviewerId !== staffId;
  console.log(forReview);

  const toggleGpxFileReview = useToggleReviewGpx();

  const { mutate: approveGpxFile } = useApproveGpxFile(setLoadingAction);

  const handleReviewClick = () => {
    if (!gpxFile) return;

    if (forReview) {
      // Claim the GPX file for review
      toggleGpxFileReview.mutate({
        trailId: String(trailId),
        gpxId: String(gpxFile.id),
        shouldClaim: true,
      });
    } else {
      // Cancel the review
      toggleGpxFileReview.mutate({
        trailId: String(trailId),
        gpxId: String(gpxFile.id),
        shouldClaim: false,
      });
    }
  };

  const handleApproveClick = (approved: boolean) => {
    setLoadingAction(approved ? "approve" : "reject");
    approveGpxFile({
      trailId: String(trailId),
      approved: approved,
      gpxId: gpxFile.id,
    });
  };

  return (
    <>
      {gpxFile.gpxStatus !== StatusEnum.approved && (
        <button onClick={handleReviewClick} className="review-btn">
          {forReview ? "review" : "cancel"}
        </button>
      )}

      <Map gpxUrl={gpxFile?.gpxUrl} setTrackInfo={setTrackInfo} />

      {!forReview && gpxFile.gpxStatus !== StatusEnum.approved && (
        <div className="button-pair">
          <SubmitButton
            className="button-pair review-btn"
            isSubmitting={loadingAction === "approve"}
            disabled={loadingAction !== null}
            buttonName="Approve"
            onClick={() => handleApproveClick(true)}
          />
          <SubmitButton
            className="button-pair review-btn"
            isSubmitting={loadingAction === "reject"}
            disabled={loadingAction !== null}
            buttonName="Reject"
            onClick={() => handleApproveClick(false)}
          />
        </div>
      )}
    </>
  );
};

export default ApproveTrailGpx;
