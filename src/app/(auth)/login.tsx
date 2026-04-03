import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import { LoginForm } from '@/features/auth/components/login-form';
import { KeyboardScreen } from '@/shared/components/ui/keyboard-screen';
import { ScrollableScreen } from '@/shared/components/ui/scrollable-screen';

export default function LoginScreen() {
  return (
    <KeyboardScreen>
      <ScrollableScreen>
        <View style={styles.header}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>
            Use a valid email format. Password must be at least 8 characters.
          </Text>
        </View>
        <LoginForm />
      </ScrollableScreen>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
