export type APIError =
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'EMAIL_ALREADY_IN_USE'
  | 'INCORRECT_CREDENTIALS'
  | 'EMAIL_NOT_VALIDATED'
  | 'NOT_AVAILABLE';

export type ResponseSuccessNoPayload = {
  isSuccess: true,
}

export type ResponseSuccess<T> = {
  isSuccess: true,
  payload: T
}

export type ResponseError = {
  isSuccess: false,
  error: APIError
}

export type APIResponseNoPayload = ResponseError | ResponseSuccessNoPayload

export type APIResponseWithPayload<T> = ResponseError | ResponseSuccess<T>

export const asError = (error: APIError): ResponseError => ({
  isSuccess: false,
  error,
});

export const asSuccess = (): ResponseSuccessNoPayload => ({ isSuccess: true });
