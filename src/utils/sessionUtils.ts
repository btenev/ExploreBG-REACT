import { useSessionStore } from '../store/sessionStore';

export const useHasSession = (): boolean => useSessionStore((state) => state.user !== null);

export const useIsAdminOrModerator = (): boolean =>
  useSessionStore((state) =>
    ['ADMIN', 'MODERATOR'].some((role) => state.user?.userRoles.includes(role))
  );
