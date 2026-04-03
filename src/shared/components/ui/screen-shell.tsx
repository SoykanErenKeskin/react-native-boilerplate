import { type ReactNode } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/config/theme';

export type ScreenShellProps = {
  children: ReactNode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

/**
 * Internal: shared safe area, background, and horizontal inset for all screen variants.
 */
export function ScreenShell({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  style,
  contentStyle,
}: ScreenShellProps) {
  return (
    <SafeAreaView style={[styles.safe, style]} edges={edges}>
      <View style={[styles.inner, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenHorizontal,
  },
});
