import { Stack } from 'expo-router';
import { type ReactNode, useEffect } from 'react';

import { useAuthStore } from '@/features/auth/store/auth-store';
import { AppProviders } from '@/providers/app-providers';
import { setAuthTokenGetter } from '@/services/api/interceptors';

function AuthBootstrap({ children }: { children: ReactNode }) {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    setAuthTokenGetter(() => useAuthStore.getState().token);
    void hydrate();
  }, [hydrate]);

  return children;
}

export default function RootLayout() {
  return (
    <AppProviders>
      <AuthBootstrap>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthBootstrap>
    </AppProviders>
  );
}
