import { type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <View style={styles.root}>
      <View style={styles.top}>
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          {description ? <Text style={styles.description}>{description}</Text> : null}
        </View>
        {actions ? <View style={styles.actions}>{actions}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  titles: { flex: 1, gap: theme.spacing.xs },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  actions: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});
