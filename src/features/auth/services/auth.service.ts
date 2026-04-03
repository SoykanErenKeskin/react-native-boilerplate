import { api } from '@/services/api/client';
import { normalizeApiError } from '@/services/api/interceptors';

/**
 * Placeholder auth API. When no backend is available, returns a local session for preview.
 */
export async function loginRequest(
  email: string,
  password: string,
): Promise<{ token: string }> {
  await new Promise((r) => setTimeout(r, 350));
  try {
    const { data } = await api.post<{ token: string }>('/auth/login', {
      email,
      password,
    });
    if (data?.token) {
      return data;
    }
  } catch (error) {
    if (!__DEV__) {
      const normalized = normalizeApiError(error);
      throw new Error(normalized.message);
    }
  }
  return { token: `preview-${email.length}` };
}
