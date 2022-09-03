import { ErrorMessagePipe } from './error-message.pipe';
import { ErrorMessages } from '@data/constants/global-error-messages';

describe('ErrorMessagePipe', () => {
  const fakeErrorMessages: Pick<ErrorMessages, 'SERVER_ERROR'> = {
    SERVER_ERROR: 'Server error occurred',
  };

  let errorMessagePipe: ErrorMessagePipe;

  beforeEach(() => {
    errorMessagePipe = new ErrorMessagePipe(fakeErrorMessages as ErrorMessages);
  });

  it('returns the error message for the error', () => {
    expect(errorMessagePipe.transform('SERVER_ERROR')).toBe('Server error occurred');
  });
});
