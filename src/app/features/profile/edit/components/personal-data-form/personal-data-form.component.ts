import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Gender, genderList, PersonalData } from '../../../types/profile.types';
import { CityLookupValidator } from '../../../validators/city-lookup.validator';
import { ProfileService } from '../../../services/profile.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { distinctUntilChanged, of, switchMap } from 'rxjs';

const zipFormat = /\d{5}/g;
const sizeFormat = /\d{3}/g;

@UntilDestroy()
@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
})
export class PersonalDataFormComponent implements OnInit {
  personalDataForm!: FormGroup<Record<keyof PersonalData, FormControl<any>>>;

  genderList = genderList;
  minDate: Date;
  maxDate: Date;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private fb: NonNullableFormBuilder,
    private profileService: ProfileService
  ) {
    // set min and max selectable date of birth relative to the current year
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

  ngOnInit(): void {
    this.personalDataForm = this.formGroupDirective.form;
    // set floatLabel to always for this form group
    this.personalDataForm.addControl(
      'birthDate',
      new FormControl<Date | null>(null, [Validators.required])
    );
    this.personalDataForm.addControl(
      'zipCode',
      new FormControl<string>('', {
        validators: [Validators.required, Validators.pattern(zipFormat)],
        asyncValidators: [
          CityLookupValidator.createValidator(this.profileService),
        ],
        nonNullable: true,
      })
    );
    this.personalDataForm.addControl(
      'city',
      new FormControl<string>({ value: '', disabled: true })
    );
    this.personalDataForm.addControl(
      'gender',
      new FormControl<Gender>('NA', {
        validators: [Validators.required],
        nonNullable: true,
      })
    );
    this.personalDataForm.addControl(
      'size',
      new FormControl<number | null>(null, [
        Validators.required,
        Validators.pattern(sizeFormat),
      ])
    );

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

  hasFieldError(field: string, error: string): boolean {
    if (this.personalDataForm.get(field) === null) {
      throw new Error(`Field ${field} does not exist`);
    }
    return this.personalDataForm.get(field)!.hasError(error);
  }
}
