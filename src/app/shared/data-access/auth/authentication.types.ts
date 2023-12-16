export type UserRegistration = {
  email: string;
  password: string;
  acceptTermsAndConditions: true;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type PasswordChangeRequest = {
  email: string;
};

export type EmailValidationCodeRequest = {
  email: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
};
