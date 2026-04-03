import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuthStore } from '@/features/auth/store/auth-store';
import { theme } from '@/config/theme';
import { routes } from '@/shared/constants/routes';

export default function Index() {
  const hydrated = useAuthStore((s) => s.hydrated);
  const token = useAuthStore((s) => s.token);

  if (!hydrated) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  if (token) {
    return <Redirect href={routes.app.home} />;
  }

  return <Redirect href={routes.auth.login} />;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
});
