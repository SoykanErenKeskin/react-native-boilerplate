import { type ReactNode } from 'react';
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import { theme } from '@/config/theme';
import { Button } from '@/shared/components/ui/button';

export type AppModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
};

/**
 * Generic modal shell for confirmations or focused tasks (e.g. future billing flows).
 */
export function AppModal({
  visible,
  onRequestClose,
  title,
  children,
  footer,
}: AppModalProps) {
  const { height } = useWindowDimensions();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={[styles.backdrop, { minHeight: height }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={StyleSheet.absoluteFill}
          onPress={onRequestClose}
        />
        <View style={styles.sheet} pointerEvents="box-none">
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <View style={styles.body}>{children}</View>
          {footer ?? (
            <View style={styles.footer}>
              <Button
                variant="secondary"
                onPress={onRequestClose}
                style={styles.footerBtn}
              >
                Cancel
              </Button>
              <Button onPress={onRequestClose} style={styles.footerBtn}>
                Close
              </Button>
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  body: {
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.sm,
  },
  footerBtn: { minWidth: 100 },
});
