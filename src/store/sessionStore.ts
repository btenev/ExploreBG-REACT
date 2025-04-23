import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserSession } from '../types';

interface SessionStore {
  user: IUserSession | null;
  setUser: (user: IUserSession | null) => void;
  updateUserFields: (fields: Partial<IUserSession>) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      updateUserFields: (fields: Partial<IUserSession>) =>
        set((state) => {
          if (!state.user) return { user: null };

          return {
            user: {
              ...state.user,
              ...fields, // Merges the new fields with the existing user
            },
          };
        }),

      clearSession: () => set({ user: null }),
    }),
    {
      name: 'session-storage', // key in sessionStorage
      storage: {
        getItem: (key) => {
          const value = sessionStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
);
