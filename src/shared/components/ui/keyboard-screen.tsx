import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

/**
 * Tune when using a visible stack header (iOS).
 */
export const KEYBOARD_VERTICAL_OFFSET = 56;

type KeyboardScreenProps = {
  children: ReactNode;
};

/**
 * Single keyboard-avoiding boundary. Children should be `ScrollableScreen` or `Screen`.
 */
export function KeyboardScreen({ children }: KeyboardScreenProps) {
  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
