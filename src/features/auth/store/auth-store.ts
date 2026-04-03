import { create } from 'zustand';

import * as secureStorage from '@/services/storage/secure-storage';

const TOKEN_KEY = 'session_token';

type AuthState = {
  token: string | null;
  hydrated: boolean;
  setSession: (token: string) => Promise<void>;
  clearSession: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  hydrated: false,
  setSession: async (token) => {
    try {
      await secureStorage.setSecureItem(TOKEN_KEY, token);
    } catch {
      // Secure storage may be unavailable on some web targets.
    }
    set({ token });
  },
  clearSession: async () => {
    try {
      await secureStorage.removeSecureItem(TOKEN_KEY);
    } catch {
      // ignore
    }
    set({ token: null });
  },
  hydrate: async () => {
    let token: string | null = null;
    try {
      token = await secureStorage.getSecureItem(TOKEN_KEY);
    } catch {
      token = null;
    }
    set({ token: token ?? null, hydrated: true });
  },
}));
