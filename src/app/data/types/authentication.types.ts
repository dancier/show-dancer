export type UserRegistration = {
  email: string;
  password: string;
  acceptTermsAndConditions: true;
};

export type UserRegistrationBeta = {
  sender: string;
  message: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type Roles = 'ROLE_HUMAN' | 'ROLE_USER' | 'ROLE_ANONYMOUS';

export type VerificationResponse =
  | 'SUCCESS'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR';

export type RegistrationResponse =
  | 'SUCCESS'
  | 'EMAIL_ALREADY_IN_USE'
  | 'SERVER_ERROR'
  | 'UNAUTHORIZED';

export type LoginResponse =
  | 'SUCCESS'
  | 'INCORRECT_CREDENTIALS'
  | 'EMAIL_NOT_VALIDATED'
  | 'SERVER_ERROR';

export type LogoutResponse = 'SUCCESS' | 'SERVER_ERROR';

export type GetStatusResponse = {
  email: string;
  roles: Roles[];
};
