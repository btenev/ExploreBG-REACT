import { useSessionStore } from '../store/sessionStore';

export const useHasSession = (): boolean => useSessionStore((state) => state.user !== null);

export const clearSession = (): void => useSessionStore.getState().clearSession();

export const useIsAdminOrModerator = (): boolean =>
  useSessionStore((state) =>
    ['ADMIN', 'MODERATOR'].some((role) => state.user?.userRoles.includes(role))
  );

export const useUserImage = (): string | null =>
  useSessionStore((state) => state.user?.userImage ?? null);

export const getUserId = (): number | null => useSessionStore.getState().user?.userId ?? null;
