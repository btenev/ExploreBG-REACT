import { useParams } from "react-router-dom";

import {
  AccessDenied,
  AdminLayout,
  LoadingScreenWrapper,
  NotFoundModal,
  RequireAuthModal,
  SmallFooter,
} from "@components/common";
import { ApproveTrailDetailsImagesAndGpx } from "@components/moderation/trail";
import { useAvailableAccommodations } from "@hooks/dataHooks/accommodationHooks";
import { useAvailableDestinations } from "@hooks/dataHooks/destinationHooks";
import { useGetCreatedTrailForReview } from "@hooks/dataHooks/moderation/trailReviewHooks";
import { useTrailEnums } from "@hooks/dataHooks/utilityHooks";
import { isApiError } from "@utils/errorHandlers";
import { useSessionInfo } from "@utils/sessionUtils";

const TrailReview = () => {
  const { trailId } = useParams<{ trailId: string }>();

  const numericId = Number(trailId);
  const invalidId = !trailId || isNaN(numericId);

  const { isAdminOrModerator, hasHydrated, staffId } = useSessionInfo();
  const isAuthenticated = staffId !== null;

  const enabled =
    !invalidId && hasHydrated && isAuthenticated && isAdminOrModerator;

  const {
    data: trail,
    error,
    isLoading,
  } = useGetCreatedTrailForReview(trailId ?? null, enabled);
  const { data: trailEnums } = useTrailEnums(enabled);
  const { data: accommodations } = useAvailableAccommodations(enabled);
  const { data: destinations } = useAvailableDestinations(enabled);

  if (!hasHydrated) return <LoadingScreenWrapper />;

  if (invalidId)
    return (
      <NotFoundModal message="Oops! We couldn't find that trail. Please check the link and try again." />
    );

  if (!isAuthenticated)
    return (
      <RequireAuthModal message="Only logged-in users can access this page." />
    );

  if (!isAdminOrModerator) return <AccessDenied />;

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return (
      <NotFoundModal message="The hiking trail you're looking for was not found." />
    );
  }

  if (!trail) {
    return (
      <NotFoundModal message="The hiking trail you're looking for was not found." />
    );
  }

  return (
    <AdminLayout>
      <main className="admin-forms form-container">
        {trailEnums && (
          <ApproveTrailDetailsImagesAndGpx
            formEnums={trailEnums}
            availableAccommodations={accommodations || []}
            availableDestinations={destinations || []}
            dataForReview={trail}
          />
        )}

        <SmallFooter />
      </main>
    </AdminLayout>
  );
};

export default TrailReview;
