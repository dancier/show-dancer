import { Pipe, PipeTransform } from '@angular/core';
import { ErrorMessages, globalErrorMessages } from '@data/constants/global-error-messages';
import { APIError } from '@data/types/response.types';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {

  constructor(private errorMessages: ErrorMessages = globalErrorMessages) { }

  transform(error: APIError): string {
    return this.errorMessages[error];
  }
}
