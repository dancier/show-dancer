import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@features/profile/services/profile.service';
import { Gender, genderList } from '../../types/profile.types';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

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
    //TODO: birthDate is set as a date by the material datepicker, but the backend expects a string
    birthDate: ['', [Validators.required]],
    zipCode: ['', [Validators.required, Validators.pattern(zipFormat)]],
    city: [''],
    gender: new FormControl<Gender>('NA', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    size: [170, [Validators.required, Validators.pattern(sizeFormat)]],
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
    // eslint-disable-next-line no-console
    console.log(this.personalDataForm.value.birthDate);
    if (this.personalDataForm.valid) {
      this.profileDataService.setPersonalData(
        this.personalDataForm.getRawValue()
      );
      this.router.navigate(['profile/initial-setup/dances-self']);
    }
  }
}
