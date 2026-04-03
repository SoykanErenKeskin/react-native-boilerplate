/**
 * App HTTP client. Layering: app/features → services/api → axios.
 * Do not import feature modules from here.
 */
import axios from 'axios';

import { appConfig } from '@/config/app';

import { attachRequestInterceptor, attachResponseInterceptor } from './interceptors';

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 25_000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

attachRequestInterceptor(api);
attachResponseInterceptor(api);
