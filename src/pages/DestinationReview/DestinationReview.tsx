import { useParams } from "react-router-dom";

import {
  AccessDenied,
  AdminLayout,
  LoadingScreenWrapper,
  NotFoundModal,
  RequireAuthModal,
  SmallFooter,
} from "@components/common";
import { ApproveDestinationDetailsImages } from "@components/moderation/destination";
import { useGetCreatedDestinationForReview } from "@hooks/dataHooks/moderation/destinationReviewHooks";
import { useDestinationEnums } from "@hooks/dataHooks/utilityHooks/useDestinationEnums";
import { useSession } from "@hooks/sessionHooks";
import { isApiError } from "@utils/errorHandlers";

const DestinationReview = () => {
  const { destinationId } = useParams<{ destinationId: string }>();

  const numericId = Number(destinationId);
  const invalidId = !destinationId || isNaN(numericId);

  const { isAdminOrModerator, hasHydrated, userId } = useSession();
  const isAuthenticated = userId !== null;

  const enabled =
    !invalidId && hasHydrated && isAuthenticated && isAdminOrModerator;

  const {
    data: destination,
    error,
    isLoading,
  } = useGetCreatedDestinationForReview(destinationId ?? null, enabled);

  const { data: destinationEnums } = useDestinationEnums(true);

  if (!hasHydrated) return <LoadingScreenWrapper />;

  if (invalidId)
    return (
      <NotFoundModal message="Oops! We couldn't find that destination. Please check the link and try again." />
    );

  if (!isAuthenticated)
    return (
      <RequireAuthModal message="Only logged-in users can access this page." />
    );

  if (!isAdminOrModerator) return <AccessDenied />;

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return (
      <NotFoundModal message="The destination you're looking for was not found." />
    );
  }

  if (!destination) {
    return (
      <NotFoundModal message="The destination you're looking for was not found." />
    );
  }
  return (
    <AdminLayout>
      <main className="admin-forms form-container">
        {destinationEnums && (
          <ApproveDestinationDetailsImages
            formEnums={destinationEnums}
            dataForReview={destination}
          />
        )}
        <SmallFooter />
      </main>
    </AdminLayout>
  );
};

export default DestinationReview;
