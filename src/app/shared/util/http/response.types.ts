export type APIError =
  | 'VALIDATION_ERROR'
  | 'CODE_VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'EMAIL_ALREADY_IN_USE'
  | 'INCORRECT_CREDENTIALS'
  | 'EMAIL_NOT_VALIDATED'
  | 'NOT_AVAILABLE'
  | 'NAME_ALREADY_EXISTS'
  | 'NOT_A_HUMAN'
  | 'ZIP_CODE_NOT_FOUND';

export type ResponseSuccessNoPayload = {
  isSuccess: true;
};

export type ResponseSuccess<T> = {
  isSuccess: true;
  payload: T;
};

export type ResponseError = {
  isSuccess: false;
  error: APIError;
};

export type OldAPIResponse<T> = ResponseError | ResponseSuccess<T>;

export const asError = (error: APIError): ResponseError => ({
  isSuccess: false,
  error,
});

export type AsSuccess = <T>(payload: T) => ResponseSuccess<T>;

export const asSuccess: AsSuccess = (payload) => ({
  isSuccess: true,
  payload,
});

export type ApiResponse<T> =
  | ApiResponseSuccess<T>
  | ApiResponseError
  | ApiResponseLoading;

export type ApiResponseLoading = {
  fetchStatus: 'loading';
};

export type ApiResponseSuccess<T> = {
  fetchStatus: 'success';
  payload: T;
};

export type ApiResponseError = {
  fetchStatus: 'error';
  httpStatusCode: number;
};
