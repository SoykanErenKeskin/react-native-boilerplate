const apiBaseUrl =
  process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'https://example.com';

export const appConfig = {
  name: 'Mobile Foundation',
  apiBaseUrl,
} as const;
