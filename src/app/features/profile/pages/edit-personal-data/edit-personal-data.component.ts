import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@features/profile/services/profile.service';
import { Gender, genderList, PersonalData } from '../../types/profile.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';
import { APIError } from '@shared/http/response.types';
import { de } from 'date-fns/locale';
import { CityLookupValidator } from '../../validators/city-lookup.validator';

type Field = 'BIRTHDAY' | 'GENDER' | 'HEIGHT' | 'ZIP';

const germanDateFormat =
  /^(0[1-9]|[12][0-9]|3[01])[- //](0[1-9]|1[012])[- //](19|20)\d\d$/g;
const zipFormat = /\d{5}/g;
const sizeFormat = /\d{3}/g;

@UntilDestroy()
@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss'],
})
export class EditPersonalDataComponent implements OnInit {
  personalDataForm = this.fb.group({
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    zipCode: [
      '',
      [Validators.required, Validators.pattern(zipFormat)],
      [CityLookupValidator.createValidator(this.profileService)],
    ],
    city: [''],
    gender: new FormControl<Gender>('NA', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    size: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(sizeFormat),
    ]),
  });

  fieldInFocus?: Field;
  genderList = genderList;
  minDate: Date;
  maxDate: Date;
  error?: APIError;

  constructor(
    public profileService: ProfileService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {
    // set min and max selectable date of birth relative to the current year
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

  ngOnInit(): void {
    // TODO: fill the form fields with current users data if available, use profileservice & validator
    this.personalDataForm.valueChanges
      .pipe(
        untilDestroyed(this),
        map((formValues) => formValues.zipCode),
        distinctUntilChanged(),
        map((zipCode) => (zipCode && zipCode.length === 5 ? zipCode : null)),
        switchMap((zipCode) => {
          if (zipCode === null) {
            return of(null);
          }
          return this.profileService.getCity$(zipCode);
        })
      )
      .subscribe((city) => {
        this.personalDataForm.patchValue({ city: city || '' });
      });
  }

  hasFocus(field: Field): boolean {
    return field === this.fieldInFocus;
  }

  setFocus(field: Field): void {
    this.fieldInFocus = field;
  }

  unsetFocus(field: Field): void {
    if (this.fieldInFocus === field) {
      this.fieldInFocus = undefined;
    }
  }

  submitForm(): void {
    if (this.personalDataForm.valid) {
      const formValues = this.personalDataForm.getRawValue();
      this.profileService
        .setPersonalData({
          ...formValues,
          birthDate: format(formValues.birthDate!, 'yyyy-MM-dd', {
            locale: de,
          }),
        } as PersonalData)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['profile/initial-setup/dances-self']);
          } else {
            this.error = response.error;
          }
        });
    }
  }

  hasFieldError(field: string, error: string): boolean {
    if (this.personalDataForm.get(field) === null) {
      throw new Error(`Field ${field} does not exist`);
    }
    return this.personalDataForm.get(field)!.hasError(error);
  }
}
