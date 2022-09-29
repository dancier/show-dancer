import { Pipe, PipeTransform } from '@angular/core';
import { APIError } from '@data/types/response.types';
import { errorMessages } from '@shared/error-handling/error-messages';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(error: APIError): string {
    return errorMessages[error];
  }
}
