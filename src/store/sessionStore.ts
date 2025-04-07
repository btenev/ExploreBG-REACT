import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserSession } from '../types';

interface SessionStore {
  user: IUserSession | null;
  setUser: (user: Omit<IUserSession, 'isAdmin' | 'isModerator'> | null) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        if (user === null) {
          set({ user: null });
          return;
        }

        const isAdmin = user.userRoles.includes('ADMIN');
        const isModerator = user.userRoles.includes('MODERATOR');

        set({
          user: {
            ...user,
            isAdmin,
            isAdminOrModerator: isAdmin || isModerator,
          },
        });
      },
      clearSession: () => set({ user: null }),
    }),
    {
      name: 'session-storage', // key in sessionStorage
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) =>
          sessionStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
);
