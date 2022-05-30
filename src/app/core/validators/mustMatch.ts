import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates that two form controls have the same value.
 * If they don't have the same value, matchingControl will get a 'matching' validation error.
 * @param controlName
 * @param matchingControlName
 */
export function mustMatch(controlName:string, matchingControlName: string): ValidatorFn {
  return (controls: AbstractControl): ValidationErrors | null => {
    const control = controls.get(controlName);
    const matchingControl = controls.get(matchingControlName);

    if (control === null) {
      console.error('control name doesn\'t exist', controlName);
      return null;
    }
    if (matchingControl === null) {
      console.error('control name doesn\'t exist', controlName);
      return null;
    }
    if (matchingControl.errors && !matchingControl.errors['matching']) {
      return null;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ matching: true });
      return { matching: true };
    }
    return null;
  };
}
