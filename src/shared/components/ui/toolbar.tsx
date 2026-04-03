import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@/config/theme';

type ToolbarProps = {
  children: ReactNode;
};

/**
 * Layout-only row for actions, filters, or controls. No domain logic.
 */
export function Toolbar({ children }: ToolbarProps) {
  return <View style={styles.row}>{children}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
});
