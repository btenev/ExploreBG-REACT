import AllWaitingApprovalTable from '../../components/AllWaitingApprovalTable';
import {
  AccessDenied,
  AdminProtectedPage,
  LoadingScreenWrapper,
  RequireAuthModal,
} from '../../components/common';

import { useGetWaitingApprovalCount } from '../../hooks/dataHooks/moderation';
import { useSessionInfo } from '../../utils/sessionUtils';

const WaitingApproval = () => {
  const { isAdminOrModerator, hasHydrated, staffId } = useSessionInfo();

  const isAuthenticated = staffId !== null;

  const { data: entitiesApprovalCount, isLoading } = useGetWaitingApprovalCount({
    enabled: hasHydrated && isAuthenticated && isAdminOrModerator,
  });

  if (!hasHydrated) return <LoadingScreenWrapper />;

  if (!isAuthenticated)
    return <RequireAuthModal message="Only logged-in users can access this page." />;

  if (!isAdminOrModerator) return <AccessDenied />;

  if (isLoading) return <LoadingScreenWrapper />;

  return (
    <AdminProtectedPage>
      {entitiesApprovalCount && (
        <AllWaitingApprovalTable waitingApprovalCount={entitiesApprovalCount} staffId={staffId} />
      )}
    </AdminProtectedPage>
  );
};

export default WaitingApproval;
