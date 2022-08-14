type Env = {
  apiUrl: string;
}
// retrieve environment variables from window.env (see assets/env.template.js)
const env: Env  = (window as any).env;

export const environment = {
  production: true,
  apiUrl: env.apiUrl || 'API_URL_NOT_SET_IN_ENV',
};
