import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileHttpService } from '@core/profile/profile-http.service';
import { ProfileService } from '@core/profile/profile.service';
import {
  APIError,
  APIResponse,
  asError,
  ResponseError,
} from '@shared/http/response.types';
import { of, switchMap } from 'rxjs';
import { NameAvailability } from '../../../common/types/profile.types';
import { ErrorMessagePipe } from '@shared/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '../../../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-init-user-name',
    templateUrl: './init-user-name.component.html',
    styleUrls: ['./init-user-name.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgIf,
        AlertComponent,
        MatButtonModule,
        ErrorMessagePipe,
    ],
})
export class InitUserNameComponent {
  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
  });
  error?: APIError;

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
