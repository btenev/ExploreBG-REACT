import { useParams } from "react-router-dom";

import {
  AccessDenied,
  AdminLayout,
  LoadingScreenWrapper,
  NotFoundModal,
  RequireAuthModal,
  SmallFooter,
} from "@components/common";
import { ApproveAccommodationDetailsImages } from "@components/moderation/accommodation";
import { useGetCreatedAccommodationForReview } from "@hooks/dataHooks/moderation/accommodationReviewHooks";
import { useAccommodationEnums } from "@hooks/dataHooks/utilityHooks/useAccommodationEnums";
import { useSession } from "@hooks/sessionHooks";
import { isApiError } from "@utils/errorHandlers";

const AccommodationReview = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();

  const numericId = Number(accommodationId);
  const invalidId = !accommodationId || isNaN(numericId);

  const { isAdminOrModerator, hasHydrated, userId } = useSession();
  const isAuthenticated = userId !== null;

  const enabled =
    !invalidId && hasHydrated && isAuthenticated && isAdminOrModerator;

  const {
    data: accommodation,
    error,
    isLoading,
  } = useGetCreatedAccommodationForReview(accommodationId ?? null, enabled);

  const { data: accommodationEnums } = useAccommodationEnums(true);

  if (!hasHydrated) return <LoadingScreenWrapper />;

  if (invalidId)
    return (
      <NotFoundModal message="Oops! We couldn't find that accommodation. Please check the link and try again." />
    );

  if (!isAuthenticated)
    return (
      <RequireAuthModal message="Only logged-in users can access this page." />
    );

  if (!isAdminOrModerator) return <AccessDenied />;

  if (isLoading) return <LoadingScreenWrapper />;

  if (error && isApiError(error) && error.status === 404) {
    return (
      <NotFoundModal message="The accommodation you're looking for was not found." />
    );
  }

  if (!accommodation) {
    return (
      <NotFoundModal message="The accommodation you're looking for was not found." />
    );
  }
  return (
    <AdminLayout>
      <main className="admin-forms form-container">
        {accommodationEnums && (
          <ApproveAccommodationDetailsImages
            formEnums={accommodationEnums}
            dataForReview={accommodation}
          />
        )}
        <SmallFooter />
      </main>
    </AdminLayout>
  );
};

export default AccommodationReview;
