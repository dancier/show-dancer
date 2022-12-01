import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { APIError } from '@shared/http/response.types';
import { ProfileService } from '../../../common/services/profile.service';
import { Profile } from '../../../common/types/profile.types';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { PersonalDataForm } from '../../components/personal-data-form/personal-data-form.types';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  profileForm = new FormGroup<Partial<PersonalDataForm>>({});
  error?: APIError;

  constructor(
    private fb: NonNullableFormBuilder,
    public profileService: ProfileService,
    private router: Router
  ) {}

  saveProfile(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.getRawValue();
      this.profileService
        .setProfile({
          ...formValues,
          birthDate: format(formValues.birthDate!, 'yyyy-MM-dd', {
            locale: de,
          }),
        } as Profile)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['profile']);
          } else {
            this.error = response.error;
          }
        });
    } else {
      // display error messages for all invalid controls
      this.profileForm.markAllAsTouched();
    }
  }
}
