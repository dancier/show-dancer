import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
import { PersonalData } from '../../../types/profile.types';
import { UntilDestroy } from '@ngneat/until-destroy';
import { APIError } from '@shared/http/response.types';

type Field = 'BIRTHDAY' | 'GENDER' | 'HEIGHT' | 'ZIP';

const germanDateFormat =
  /^(0[1-9]|[12][0-9]|3[01])[- //](0[1-9]|1[012])[- //](19|20)\d\d$/g;
const zipFormat = /\d{5}/g;
const sizeFormat = /\d{3}/g;

@UntilDestroy()
@Component({
  selector: 'app-init-personal-data',
  templateUrl: './init-personal-data.component.html',
  styleUrls: ['./init-personal-data.component.scss'],
})
export class InitPersonalDataComponent implements OnInit {
  personalDataForm = this.fb.group({
    personalData: new FormGroup({}),
  });

  error?: APIError;

  constructor(
    public profileService: ProfileService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.personalDataForm.valid) {
      const formValues = this.personalDataForm.getRawValue()
        .personalData as PersonalData;
      this.profileService
        .setPersonalData({
          ...formValues,
          // TODO: fix this thing
          // birthDate: format(formValues.birthDate!, 'yyyy-MM-dd', {
          //   locale: de,
          // }),
        } as PersonalData)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['profile/initial-setup/dances-self']);
          } else {
            this.error = response.error;
          }
        });
    } else {
      // display error messages for all invalid controls
      this.personalDataForm.markAllAsTouched();
    }
  }

  hasFieldError(field: string, error: string): boolean {
    if (this.personalDataForm.get(field) === null) {
      throw new Error(`Field ${field} does not exist`);
    }
    return this.personalDataForm.get(field)!.hasError(error);
  }
}
