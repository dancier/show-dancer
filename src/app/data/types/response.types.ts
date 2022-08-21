export type ResponseSuccessNoPayload = {
  isSuccess: true,
}

export type ResponseSuccess<T> = {
  isSuccess: true,
  payload: T
}

export type ResponseError<T> = {
  isSuccess: false,
  error: T
}
