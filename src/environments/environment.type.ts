// type to use for all environment files
export type Environment = {
  // whether the app is running in production mode
  production: boolean;

  // the URL of the backend API
  apiUrl: string;

  // whether to use the mock backend
  mockBackend: boolean;

  // whether to remove the data-test attributes from the DOM
  removeTestAttributes: boolean;

  // whether to enable developer tools (dev-only features)
  enableDevTools: boolean;
};

// type to use for the object inside window.env (see assets/env.template.js)
export type Env = {
  apiUrl: string;
};
