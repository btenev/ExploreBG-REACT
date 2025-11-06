import { useSessionStore } from "../store/sessionStore";

export const useHasSession = (): boolean =>
  useSessionStore((state) => state.user !== null);

export const clearSession = (): void =>
  useSessionStore.getState().clearSession();

export const useIsAdminOrModerator = (): boolean =>
  useSessionStore((state) =>
    ["ADMIN", "MODERATOR"].some((role) => state.user?.userRoles.includes(role))
  );

export const useSessionInfo = () => {
  const user = useSessionStore((state) => state.user);
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  const sessionRoles = user?.userRoles ?? [];
  const userId = user?.userId ?? null;

  return {
    sessionRoles,
    isAdmin: sessionRoles.includes("ADMIN"),
    isModerator: sessionRoles.includes("MODERATOR"),
    isAdminOrModerator: ["ADMIN", "MODERATOR"].some((r) =>
      sessionRoles.includes(r)
    ),
    userId,
    hasHydrated,
  };
};

export const useUserImage = (): string | null =>
  useSessionStore((state) => state.user?.userImage ?? null);

export const getUserId = (): number | null =>
  useSessionStore.getState().user?.userId ?? null;
