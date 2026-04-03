import { type ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import { Button } from '@/shared/components/ui/button';

type LoaderProps = {
  message?: string;
};

export function Loader({ message = 'Loading…' }: LoaderProps) {
  return (
    <View style={styles.center} accessibilityRole="progressbar">
      <ActivityIndicator color={theme.colors.primary} />
      <Text style={styles.muted}>{message}</Text>
    </View>
  );
}

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.muted}>{description}</Text> : null}
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.muted}>{message}</Text>
      {onRetry ? (
        <View style={styles.action}>
          <Button variant="secondary" onPress={onRetry}>
            Retry
          </Button>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xl,
  },
  block: {
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
  muted: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  action: { marginTop: theme.spacing.sm },
});
