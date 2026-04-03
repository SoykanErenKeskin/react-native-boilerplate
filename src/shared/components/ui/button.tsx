import { type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  StyleSheet,
  Text,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { theme } from '@/config/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  style?: ViewStyle;
};

export function Button({
  children,
  variant = 'primary',
  loading,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant].container,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles[variant].indicatorColor} size="small" />
      ) : typeof children === 'string' ? (
        <Text style={[styles.label, variantStyles[variant].label]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    ...theme.typography.label,
  },
  pressed: { opacity: 0.88 },
  disabled: { opacity: 0.45 },
});

const variantStyles: Record<
  ButtonVariant,
  {
    container: ViewStyle;
    label: TextStyle;
    indicatorColor: string;
  }
> = {
  primary: {
    container: {
      backgroundColor: theme.colors.primary,
    },
    label: { color: theme.colors.onPrimary },
    indicatorColor: theme.colors.onPrimary,
  },
  secondary: {
    container: {
      backgroundColor: theme.colors.surface,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
    },
    label: { color: theme.colors.text },
    indicatorColor: theme.colors.text,
  },
  ghost: {
    container: { backgroundColor: 'transparent' },
    label: { color: theme.colors.primary },
    indicatorColor: theme.colors.primary,
  },
  danger: {
    container: { backgroundColor: theme.colors.danger },
    label: { color: theme.colors.onPrimary },
    indicatorColor: theme.colors.onPrimary,
  },
};
