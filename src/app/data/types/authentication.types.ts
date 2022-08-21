import { ResponseError, ResponseSuccessNoPayload } from '@data/types/response.types';

export type UserRegistration = {
  email: string;
  password: string;
  acceptTermsAndConditions: true;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ResponseSuccessNoPayload | ResponseError<LoginError>;

export type LoginError = 'INCORRECT_CREDENTIALS' | 'EMAIL_NOT_VALIDATED' | 'SERVER_ERROR';

export function asLoginError(error: LoginError): ResponseError<LoginError> {
  return {
    status: 'ERROR',
    error,
  };
}
