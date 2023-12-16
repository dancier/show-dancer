import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Gender, genderList } from '../../data-access/types/profile.types';
import { CityLookupValidator } from '../../util/city-lookup.validator';
import { ProfileOldService } from '@shared/data-access/profile/profile-old.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { distinctUntilChanged, of, switchMap } from 'rxjs';
import { parse } from 'date-fns';
import { PersonalDataForm } from './personal-data-form.types';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { DataTestDirective } from '@shared/util/data-test.directive';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';

const zipFormat = /\d{5}/g;

@UntilDestroy()
@Component({
  selector: 'app-personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrls: ['./personal-data-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    DataTestDirective,
    NgFor,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatDateFnsModule,
    NgIf,
  ],
})
export class PersonalDataFormComponent implements OnInit {
  personalDataForm!: FormGroup<PersonalDataForm>;

  genderList = genderList;
  minDate: Date;
  maxDate: Date;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private fb: NonNullableFormBuilder,
    private profileService: ProfileOldService
  ) {
    // set min and max selectable date of birth relative to the current year
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 110, 0, 1);
    this.maxDate = new Date(currentYear - 10, 11, 31);
  }

  ngOnInit(): void {
    this.personalDataForm = this.formGroupDirective.form;
    this.personalDataForm.addControl(
      'aboutMe',
      new FormControl<string>('', {
        validators: [Validators.maxLength(500)],
        nonNullable: true,
      })
    );
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
        Validators.min(80),
        Validators.max(250),
      ])
    );

    this.profileService.profile$
      .pipe(untilDestroyed(this))
      .subscribe((profile) => {
        this.personalDataForm.patchValue({
          aboutMe: profile?.aboutMe,
          birthDate: parse(profile?.birthDate, 'yyyy-MM-dd', new Date()),
          zipCode: profile?.zipCode,
          city: profile?.city,
          gender: profile?.gender,
          size: profile?.size,
        });
      });

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

/*
Hallo, ich bin der Dominik. Ich spiele gerne Karten und mache auch sonst allerlei Sachen. Manchmal trinke ich Kaffee, aber nur am Wochenende, meistens trinke ich Tee, damit das klar ist. Jojo, das ist töfte, oder?

Bla blub, es ist cool ich zu sein. Nein wirklich, es ist super. Jemand anderes zu sein wäre auch langweilig.
 */
