import { catchError, map, Observable, of } from 'rxjs';
import { ApiResponse } from './response.types';
import { HttpErrorResponse } from '@angular/common/http';
import { startWith } from 'rxjs/operators';

export function toApiResponse<T>(
  obs$: Observable<T>
): Observable<ApiResponse<T>> {
  return obs$.pipe(
    map((payload) => ({
      fetchStatus: 'success' as const,
      payload,
    })),
    catchError((error: HttpErrorResponse) => {
      return of({
        fetchStatus: 'error' as const,
        httpStatusCode: error.status,
      });
    }),
    startWith({
      fetchStatus: 'loading' as const,
    })
  );
}
