import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { APIError } from '@shared/http/response.types';
import { mustMatch } from '@shared/validators/mustMatch';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  newPasswordForm = this.fb.group(
    {
      password: new FormControl<string | null>(null, [Validators.required]),
      passwordConfirm: new FormControl<string | null>(null, [
        Validators.required,
      ]),
    },
    {
      validators: [mustMatch('password', 'passwordConfirm')],
    }
  );
  error?: APIError;

  constructor(
    private fb: NonNullableFormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.newPasswordForm.valid) {
      const { password } = this.newPasswordForm.value;

      this.route.params
        .pipe(
          switchMap((params) => {
            const validationCode: string = params['code'];
            return this.authenticationService.changePassword(
              validationCode,
              password!
            );
          })
        )
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['reset-password-success'], {
              relativeTo: this.route.parent,
            });
          } else {
            this.error = response.error;
          }
        });
    }
  }
}
