import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileHttpService } from '@features/profile/services/profile-http.service';
import { ProfileService } from '@features/profile/services/profile.service';
import { APIError } from '@shared/http/response.types';

@Component({
  selector: 'app-enter-user-name',
  templateUrl: './enter-user-name.component.html',
  styleUrls: ['./enter-user-name.component.scss'],
})
export class EnterUserNameComponent {
  usernameForm = this.fb.group({
    username: ['', [Validators.required]],
  });
  error?: APIError;

  constructor(
    public profileDataService: ProfileService,
    private profileHttpService: ProfileHttpService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}

  public hasUsernameFieldError(error: string): boolean {
    return this.usernameForm.controls.username.hasError(error);
  }

  submitForm(): void {
    if (this.usernameForm.valid && this.usernameForm.value.username) {
      const username = this.usernameForm.value.username;
      this.profileHttpService
        .checkNameAvailability$(username)
        .subscribe((response) => {
          if (response.isSuccess) {
            this.profileDataService.setDancerName(username);
            this.router.navigate(['profile/initial-setup/personal-info']);
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
