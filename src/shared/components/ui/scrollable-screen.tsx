import { type ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { theme } from '@/config/theme';
import { ScreenShell } from '@/shared/components/ui/screen-shell';
import { type ScreenProps } from '@/shared/components/ui/screen';

export type ScrollableScreenProps = Omit<ScreenProps, 'children'> & {
  children: ReactNode;
};

export function ScrollableScreen({
  children,
  padded = true,
  contentStyle,
  ...shellRest
}: ScrollableScreenProps) {
  return (
    <ScreenShell
      {...shellRest}
      contentStyle={[padded === false ? { paddingHorizontal: 0 } : null, contentStyle]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      >
        {children}
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: theme.spacing.screenBottom,
  },
});
