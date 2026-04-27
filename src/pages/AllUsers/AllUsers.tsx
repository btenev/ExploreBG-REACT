import {
  LoadingScreenWrapper,
  AccessDenied,
  AdminProtectedPage,
  RequireAuthModal,
} from "@components/common";
import { AllUsersTable } from "@components/moderation/user";
import { useGetAllUsers } from "@hooks/dataHooks/moderation/userModerationHooks";
import { useSession } from "@hooks/sessionHooks";

const AllUsers = () => {
  const { isAdminOrModerator, isAdmin, hasHydrated, userId } = useSession();

  const isAuthenticated = userId !== null;

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
        <AllUsersTable users={users} isAdmin={isAdmin} staffId={userId} />
      )}
    </AdminProtectedPage>
  );
};

export default AllUsers;
