export type UserRegistration = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse =
  | 'SUCCESS'
  | 'INCORRECT_CREDENTIALS'
  | 'EMAIL_NOT_VALIDATED'
  | 'SERVER_ERROR';
