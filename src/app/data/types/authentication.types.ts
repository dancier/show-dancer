export type UserRegistration = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type VerificationResponse =
  | 'SUCCESS'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR';

export type RegistrationResponse =
  | 'SUCCESS'
  | 'EMAIL_ALREADY_IN_USE'
  | 'SERVER_ERROR';

export type LoginResponse =
  | 'SUCCESS'
  | 'INCORRECT_CREDENTIALS'
  | 'EMAIL_NOT_VALIDATED'
  | 'SERVER_ERROR';
