import { Pipe, PipeTransform } from '@angular/core';
import { errorMessages } from '@data/constants/error-messages';
import { APIError } from '@data/types/response.types';

@Pipe({
  name: 'errorMessage',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(error: APIError): string {
    return errorMessages[error];
  }
}
