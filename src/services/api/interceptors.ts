import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

export type NormalizedApiError = {
  message: string;
  status?: number;
  code?: string;
};

let getAuthToken: () => string | null = () => null;

export function setAuthTokenGetter(getter: () => string | null) {
  getAuthToken = getter;
}

export function normalizeApiError(error: unknown): NormalizedApiError {
  if (axios.isAxiosError(error)) {
    const ax = error as AxiosError<{ message?: string }>;
    const data = ax.response?.data;
    const message =
      (typeof data === 'object' && data?.message && String(data.message)) ||
      ax.message ||
      'Request failed';
    return {
      message,
      status: ax.response?.status,
      code: ax.code,
    };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: 'Something went wrong' };
}

export function attachRequestInterceptor(instance: AxiosInstance) {
  return instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });
}

export function attachResponseInterceptor(instance: AxiosInstance) {
  return instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );
}
