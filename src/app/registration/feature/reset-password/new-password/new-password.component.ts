import { Component, inject } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthHttpService } from '@shared/data-access/auth/auth-http.service';
import { APIError } from '@shared/util/http/response.types';
import { mustMatch } from '@shared/util/mustMatch.validator';
import { switchMap } from 'rxjs';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTestDirective } from '@shared/util/data-test.directive';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  imports: [
    DataTestDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    ErrorMessagePipe,
  ],
})
export class NewPasswordComponent {
  private fb = inject(NonNullableFormBuilder);
  private authenticationService = inject(AuthHttpService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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

  public errorHandling(controlName: string, error: string): boolean {
    //@ts-ignore
    const control = this.newPasswordForm.controls[controlName];
    if (control === undefined) {
      console.error('unknown control name', controlName);
      return false;
    }
    return control.hasError(error);
  }

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
