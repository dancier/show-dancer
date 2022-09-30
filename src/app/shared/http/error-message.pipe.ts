import { Pipe, PipeTransform } from '@angular/core';
import { errorMessages } from '@shared/http/error-messages';
import { APIError } from '@shared/http/response.types';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(error: APIError): string {
    return errorMessages[error];
  }
}
