import { StyleSheet, type StyleProp } from 'react-native';

/**
 * Flattens RN style arrays; drops falsy entries (useful for conditional styles).
 * Prefer `[a, b]` inline when TypeScript literal-style inference is too narrow.
 */
export function cn<T>(
  ...styles: (StyleProp<T> | false | null | undefined)[]
): StyleProp<T> {
  return StyleSheet.flatten(styles.filter(Boolean) as StyleProp<T>[]) as StyleProp<T>;
}
