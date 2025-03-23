import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { PersonalData } from '../../../data-access/types/profile.types';
import { UntilDestroy } from '@ngneat/until-destroy';
import { APIError } from '@shared/util/http/response.types';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { PersonalDataForm } from '../../../ui/personal-data-form/personal-data-form.types';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { PersonalDataFormComponent } from '../../../ui/personal-data-form/personal-data-form.component';

@UntilDestroy()
@Component({
  selector: 'app-init-personal-data',
  templateUrl: './init-personal-data.component.html',
  styleUrls: ['./init-personal-data.component.scss'],
  imports: [
    ReactiveFormsModule,
    PersonalDataFormComponent,
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
    ErrorMessagePipe,
  ],
})
export class InitPersonalDataComponent {
  personalDataForm = new FormGroup<Partial<PersonalDataForm>>({});

  error?: APIError;

  constructor(
    public profileService: OwnProfileService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.personalDataForm.valid) {
      const formValues = this.personalDataForm.getRawValue();
      this.profileService
        .setPersonalData({
          ...formValues,
          country: 'GER',
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
