import { Env, Environment } from './environment.type';

// retrieve environment variables from window.env (see assets/env.template.js)
const env: Env = (window as any).env;

export const environment: Environment = {
  production: true,
  apiUrl: env.apiUrl || 'API_URL_NOT_SET_IN_ENV',
  mockBackend: false,
  removeTestAttributes: false,
};
