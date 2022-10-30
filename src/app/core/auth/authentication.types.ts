export type UserRegistration = {
  email: string;
  password: string;
  acceptTermsAndConditions: true;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type EmailValidationRequest = {
  email: string;
  type: EmailValidationType;
};

export type EmailValidationType = 'ACCOUNT_ACTIVATION' | 'PASSWORD_RESET';
