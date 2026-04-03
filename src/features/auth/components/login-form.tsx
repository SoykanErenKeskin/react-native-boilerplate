import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '@/config/theme';
import { loginRequest } from '@/features/auth/services/auth.service';
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas/login';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { Button } from '@/shared/components/ui/button';
import { FormField } from '@/shared/components/ui/form-field';
import { Input } from '@/shared/components/ui/input';
import { routes } from '@/shared/constants/routes';

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    try {
      const { token } = await loginRequest(values.email, values.password);
      await setSession(token);
      router.replace(routes.app.home);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Sign in failed');
    }
  });

  return (
    <View style={styles.form}>
      <FormField control={control} name="email" label="Email">
        {({ value, onChange, onBlur }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="username"
            returnKeyType="next"
          />
        )}
      </FormField>
      <FormField control={control} name="password" label="Password">
        {({ value, onChange, onBlur }) => (
          <Input
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
        )}
      </FormField>
      {submitError ? <Text style={styles.submitError}>{submitError}</Text> : null}
      <Button loading={formState.isSubmitting} onPress={onSubmit}>
        Sign in
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: theme.spacing.lg },
  submitError: { ...theme.typography.bodySmall, color: theme.colors.danger },
});
