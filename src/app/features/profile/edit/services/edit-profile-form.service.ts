import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Gender, PersonalData } from '../../common/types/profile.types';
import { CityLookupValidator } from '../../common/validators/city-lookup.validator';
import { ProfileService } from '../../common/services/profile.service';

const zipFormat = /\d{5}/g;
const sizeFormat = /\d{3}/g;

@Injectable({
  providedIn: 'root',
})
export class EditProfileFormService {
  constructor(
    private fb: NonNullableFormBuilder,
    private profileService: ProfileService
  ) {}

  public getPersonalDataForm(): FormGroup<
    Record<keyof PersonalData, FormControl<any>>
  > {
    return this.fb.group({
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
  }
}
