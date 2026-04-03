import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

type SectionProps = {
  title?: string;
  /** Right-aligned slot (actions, links). */
  action?: ReactNode;
  children: ReactNode;
};

export function Section({ title, action, children }: SectionProps) {
  return (
    <View style={styles.section}>
      {(title || action) && (
        <View style={styles.header}>
          {title ? <Text style={styles.title}>{title}</Text> : <View />}
          {action ? <View style={styles.action}>{action}</View> : null}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sectionGap,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
    flex: 1,
  },
  action: { flexShrink: 0 },
});
