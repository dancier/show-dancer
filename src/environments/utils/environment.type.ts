// type to use for all environment files
export type Environment =  {
  production: boolean;
  apiUrl: string;
}

// type to use for the object inside window.env (see assets/env.template.js)
export type Env = {
  apiUrl: string;
}
