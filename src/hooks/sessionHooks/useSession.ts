import { useSessionStore } from "@store/sessionStore";

export const useSession = () => {
  const user = useSessionStore((state) => state.user);
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  const sessionRoles = user?.userRoles ?? [];
  const userId = user?.userId ?? null;

  return {
    sessionRoles,
    isAdmin: sessionRoles.includes("ADMIN"),
    isModerator: sessionRoles.includes("MODERATOR"),
    isAdminOrModerator: ["ADMIN", "MODERATOR"].some((r) =>
      sessionRoles.includes(r),
    ),
    userId,
    hasHydrated,
  };
};
