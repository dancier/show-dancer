import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@features/profile/services/profile.service';
import { Gender, genderList, PersonalData } from '../../types/profile.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { format } from 'date-fns';

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
export class EditPersonalDataComponent {
  personalDataForm = this.fb.group({
    birthDate: new FormControl<Date | null>(null, [Validators.required]),
    zipCode: ['', [Validators.required, Validators.pattern(zipFormat)]],
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

  constructor(
    public profileDataService: ProfileService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personalDataForm.valueChanges
      .pipe(
        untilDestroyed(this),
        map((formValues) => formValues.zipCode),
        filter((zipCode) => zipCode?.length === 5),
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((zipCode) => {
          return this.profileDataService.getCity$(zipCode);
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
      this.profileDataService.setPersonalData({
        ...formValues,
        birthDate: format(formValues.birthDate!, 'yyyy.MM.dd'),
      } as PersonalData);
      this.router.navigate(['profile/initial-setup/dances-self']);
    }
  }
}
