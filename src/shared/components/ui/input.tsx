import { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from 'react-native';

import { theme } from '@/config/theme';

export type InputProps = TextInputProps & {
  containerStyle?: ViewStyle;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { style, containerStyle, ...rest },
  ref,
) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TextInput
        ref={ref}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    minHeight: 44,
    justifyContent: 'center',
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});
