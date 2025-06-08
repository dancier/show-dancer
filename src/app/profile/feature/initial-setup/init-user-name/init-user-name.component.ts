import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileHttpService } from '@shared/data-access/profile/profile-http.service';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import {
  APIError,
  asError,
  OldAPIResponse,
  ResponseError,
} from '@shared/util/http/response.types';
import { of, switchMap } from 'rxjs';
import { NameAvailability } from '../../../data-access/types/profile.types';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-init-user-name',
  templateUrl: './init-user-name.component.html',
  styleUrls: ['./init-user-name.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AlertComponent,
    MatButtonModule,
    ErrorMessagePipe,
  ],
})
export class InitUserNameComponent {
  profileService = inject(OwnProfileService);
  private profileHttpService = inject(ProfileHttpService);
  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);

  usernameForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
  });
  error?: APIError;

  public hasUsernameFieldError(error: string): boolean {
    return this.usernameForm.controls.username.hasError(error);
  }

  submitForm(): void {
    if (this.usernameForm.valid && this.usernameForm.value.username) {
      const username = this.usernameForm.value.username;
      this.profileHttpService
        .checkNameAvailability$(username)
        .pipe(
          switchMap((response: OldAPIResponse<NameAvailability>) => {
            if (!response.isSuccess) {
              return of(response as ResponseError);
            }
            if (!response.payload.available) {
              return of(asError('NAME_ALREADY_EXISTS'));
            }
            return this.profileService.setDancerName(username);
          })
        )
        .subscribe((response: OldAPIResponse<void>) => {
          if (response.isSuccess) {
            this.router.navigate(['profile/initial-setup/personal-info']);
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
