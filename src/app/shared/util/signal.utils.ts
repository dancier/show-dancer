import { computed, Signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

export function toSignalWithError<T>(
  obs$: Observable<T>,
  initialValue: T | undefined = undefined
): {
  value: Signal<T | undefined>;
  error: Signal<any>;
} {
  let source: Signal<
    | {
        value: T;
        error: undefined;
      }
    | {
        value: undefined;
        error: any;
      }
    | undefined
  >;

  if (initialValue) {
    source = toSignal(
      obs$.pipe(
        map((value) => ({ value, error: undefined })),
        catchError((err) => of({ value: undefined, error: err })),
        startWith({ value: initialValue, error: undefined })
      )
    );
  } else {
    source = toSignal(
      obs$.pipe(
        map((value) => ({ value, error: undefined })),
        catchError((err) => of({ value: undefined, error: err }))
      ),
      {
        requireSync: true,
      }
    );
  }

  const value = computed(() => source()?.value);
  const error = computed(() => source()?.error);

  return { value, error };
}
