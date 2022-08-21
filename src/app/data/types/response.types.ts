export type ResponseSuccessNoPayload = {
  status: 'SUCCESS'
}

export type ResponseSuccess<T> = {
  status: 'SUCCESS',
  payload: T
}

export type ResponseError<T> = {
  status: 'ERROR',
  error: T
}
