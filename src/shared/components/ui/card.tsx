import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { theme } from '@/config/theme';

export type CardPadding = 'default' | 'compact';

export type CardProps = ViewProps & {
  children: ReactNode;
  padding?: CardPadding;
};

export function Card({ children, style, padding = 'default', ...rest }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        padding === 'compact' ? styles.paddingCompact : styles.paddingDefault,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  paddingDefault: {
    padding: theme.spacing.lg,
  },
  paddingCompact: {
    padding: theme.spacing.dense,
  },
});
