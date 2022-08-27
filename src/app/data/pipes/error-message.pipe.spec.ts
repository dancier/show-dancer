import { ErrorMessagePipe } from './error-message.pipe';
import { APIError } from '@data/types/response.types';

describe('ErrorMessagePipe', () => {
  const fakeErrorMessages = {
    SERVER_ERROR: 'Server error occured',
  } as Record<APIError, string>;

  let errorMessagePipe: ErrorMessagePipe;

  beforeEach(() => {
    errorMessagePipe = new ErrorMessagePipe(fakeErrorMessages);
  });

  it('returns the error message for the error', () => {
    expect(errorMessagePipe.transform('SERVER_ERROR')).toBe('Server error occured');
  });
});
