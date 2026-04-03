import { type ReactNode } from 'react';
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';

type FormFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  children: (props: {
    value: string;
    onChange: (text: string) => void;
    onBlur: () => void;
  }) => ReactNode;
};

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  children,
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
        <View style={styles.wrap}>
          <Text style={styles.label}>{label}</Text>
          {children({
            value: value ?? '',
            onChange,
            onBlur,
          })}
          {error?.message ? <Text style={styles.error}>{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrap: { gap: theme.spacing.xs },
  label: {
    ...theme.typography.label,
    color: theme.colors.textSecondary,
  },
  error: {
    ...theme.typography.caption,
    color: theme.colors.danger,
  },
});
