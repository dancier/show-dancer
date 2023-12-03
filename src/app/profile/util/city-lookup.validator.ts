import { isNonNull } from '@shared/util/rxjs.utils';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { ProfileService } from '@shared/data-access/profile/profile.service';
import { distinctUntilChanged, filter, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

export class CityLookupValidator {
  static createValidator(profileService: ProfileService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        filter(isNonNull),
        filter((zipCode) => zipCode.length === 5),
        distinctUntilChanged(),
        switchMap((zipCode) => {
          return profileService.getCity$(zipCode);
        }),
        map((city) => {
          return city ? null : { cityLookup: true };
        })
      );
    };
  }
}
