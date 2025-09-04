import {
  LoadingScreenWrapper,
  AccessDenied,
  AdminProtectedPage,
  RequireAuthModal,
} from "@components/common";
import { AllUsersTable } from "@components/moderation/user";
import { useGetAllUsers } from "@hooks/dataHooks/moderation/userModerationHooks";
import { useSessionInfo } from "@utils/sessionUtils";

const AllUsers = () => {
  const { isAdminOrModerator, isAdmin, hasHydrated, staffId } =
    useSessionInfo();

  const isAuthenticated = staffId !== null;

  const { data: users, isLoading } = useGetAllUsers({
    enabled: hasHydrated && isAuthenticated && isAdminOrModerator,
  });

  if (!hasHydrated) return <LoadingScreenWrapper />;

  if (!isAuthenticated)
    return (
      <RequireAuthModal message="Only logged-in users can access this page." />
    );

  if (!isAdminOrModerator) return <AccessDenied />;

  if (isLoading) return <LoadingScreenWrapper />;

  return (
    <AdminProtectedPage>
      {users && (
        <AllUsersTable users={users} isAdmin={isAdmin} staffId={staffId} />
      )}
    </AdminProtectedPage>
  );
};

export default AllUsers;
