import { type ReactNode } from 'react';
import { StyleSheet, Text, View, type ViewProps } from 'react-native';

import { theme } from '@/config/theme';

export type BadgeProps = ViewProps & {
  children: ReactNode;
  tone?: 'neutral' | 'primary' | 'danger';
};

export function Badge({ children, style, tone = 'neutral', ...rest }: BadgeProps) {
  return (
    <View style={[styles.base, toneStyles[tone].container, style]} {...rest}>
      <Text style={[styles.text, toneStyles[tone].text]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
  },
  text: {
    ...theme.typography.caption,
  },
});

const toneStyles = {
  neutral: {
    container: { backgroundColor: theme.colors.background },
    text: { color: theme.colors.textSecondary },
  },
  primary: {
    container: { backgroundColor: 'rgba(37, 99, 235, 0.12)' },
    text: { color: theme.colors.primary },
  },
  danger: {
    container: { backgroundColor: theme.colors.dangerSurface },
    text: { color: theme.colors.danger },
  },
};
