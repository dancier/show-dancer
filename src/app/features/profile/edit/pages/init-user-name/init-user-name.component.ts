import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileHttpService } from '../../../services/profile-http.service';
import { ProfileService } from '../../../services/profile.service';
import {
  APIError,
  APIResponse,
  asError,
  ResponseError,
} from '@shared/http/response.types';
import { of, switchMap } from 'rxjs';
import { NameAvailability } from '../../../types/profile.types';

@Component({
  selector: 'app-init-user-name',
  templateUrl: './init-user-name.component.html',
  styleUrls: ['./init-user-name.component.scss'],
})
export class InitUserNameComponent {
  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
  });
  error?: APIError = 'NAME_ALREADY_EXISTS';

  constructor(
    public profileService: ProfileService,
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
        .pipe(
          switchMap((response: APIResponse<NameAvailability>) => {
            if (!response.isSuccess) {
              return of(response as ResponseError);
            }
            if (!response.payload.available) {
              return of(asError('NAME_ALREADY_EXISTS'));
            }
            return this.profileService.setDancerName(username);
          })
        )
        .subscribe((response: APIResponse<void>) => {
          if (response.isSuccess) {
            this.router.navigate(['profile/initial-setup/personal-info']);
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
