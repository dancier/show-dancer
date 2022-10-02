// type to use for all environment files
export type Environment =  {

  // whether the app is running in production mode
  production: boolean;

  // the URL of the backend API
  apiUrl: string;

  // whether to remove the data-test attributes from the DOM
  removeTestAttributes: boolean;
}

// type to use for the object inside window.env (see assets/env.template.js)
export type Env = {
  apiUrl: string;
}
