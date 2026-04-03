import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import type { ProfileSummary } from '@/features/profile/types';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';

type ProfileCardProps = {
  profile: ProfileSummary;
};

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card>
      <View style={styles.row}>
        <View style={styles.main}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.meta}>{profile.email}</Text>
          {profile.username ? <Text style={styles.meta}>@{profile.username}</Text> : null}
        </View>
        <Badge tone="neutral">Sample</Badge>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
  },
  main: { flex: 1, gap: theme.spacing.xs },
  name: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
  meta: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
