import { useRouter } from 'expo-router';
import { MessageSquare } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '@/config/theme';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { ProfileCard } from '@/features/profile/components/profile-card';
import { AppModal } from '@/shared/components/ui/modal';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { PageHeader } from '@/shared/components/ui/page-header';
import { ScrollableScreen } from '@/shared/components/ui/scrollable-screen';
import { Section } from '@/shared/components/ui/section';
import { EmptyState, ErrorState, Loader } from '@/shared/components/ui/states';
import { Textarea } from '@/shared/components/ui/textarea';
import { Toolbar } from '@/shared/components/ui/toolbar';
import { routes } from '@/shared/constants/routes';
import { useExampleUser } from '@/shared/hooks/use-example-user';

export default function HomeScreen() {
  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);
  const query = useExampleUser();
  const [modalOpen, setModalOpen] = useState(false);

  async function signOut() {
    await clearSession();
    router.replace(routes.auth.login);
  }

  return (
    <ScrollableScreen>
      <PageHeader
        title="Overview"
        description="Foundation preview for layout, spacing, and async states."
        actions={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open dialog"
            hitSlop={8}
            onPress={() => setModalOpen(true)}
          >
            <MessageSquare color={theme.colors.text} size={22} strokeWidth={2} />
          </Pressable>
        }
      />

      <Toolbar>
        <Button variant="primary" onPress={() => query.refetch()}>
          Primary action
        </Button>
        <Button variant="secondary" onPress={() => query.refetch()}>
          Refresh
        </Button>
        <Button variant="ghost" onPress={signOut}>
          Sign out
        </Button>
      </Toolbar>

      <Section title="Remote sample" action={<Badge tone="primary">Query</Badge>}>
        {query.isPending ? <Loader message="Loading sample…" /> : null}
        {query.isError ? (
          <ErrorState message={query.error.message} onRetry={() => query.refetch()} />
        ) : null}
        {query.data ? <ProfileCard profile={query.data} /> : null}
      </Section>

      <Section title="Layout">
        <Card>
          <Text style={styles.cardLabel}>Card</Text>
          <Text style={styles.cardHint}>Default padding for grouped content.</Text>
        </Card>
        <Card padding="compact" style={styles.compactCard}>
          <Text style={styles.cardLabel}>Compact</Text>
          <Text style={styles.cardHint}>Tighter padding for dense rows.</Text>
        </Card>
      </Section>

      <Section title="Empty state">
        <Card>
          <EmptyState
            title="No items"
            description="Generic empty placeholder for lists or tables."
          />
        </Card>
      </Section>

      <Section title="Multiline input">
        <Text style={styles.fieldLabel}>Multiline input</Text>
        <Textarea
          editable={false}
          placeholder="Preview only — enable when building a form."
          value=""
        />
      </Section>

      <AppModal
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        title="Dialog"
      >
        <Text style={styles.modalBody}>Neutral example dialog for confirmations.</Text>
      </AppModal>
    </ScrollableScreen>
  );
}

const styles = StyleSheet.create({
  cardLabel: {
    ...theme.typography.heading,
    color: theme.colors.text,
  },
  cardHint: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  compactCard: { marginTop: theme.spacing.sm },
  fieldLabel: {
    ...theme.typography.label,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  modalBody: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
});
