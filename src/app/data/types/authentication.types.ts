export type UserRegistration = {
  email: string;
  password: string;
  acceptTermsAndConditions: true;
};

export type LoginRequest = {
  email: string;
  password: string;
};
