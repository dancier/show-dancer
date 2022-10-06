import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, } from '@angular/forms';
import { AuthenticationService } from '@core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mustMatch } from '@shared/validators/mustMatch';
import { APIError } from '@shared/http/response.types';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss'],
})
export class RegisterUserFormComponent implements OnInit, OnDestroy {
  registrationForm!: UntypedFormGroup;
  error?: APIError;
  formStatusSubscription: Subscription | undefined;
  loggedInAsHuman = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  ngOnDestroy(): void {
    this.formStatusSubscription?.unsubscribe();
  }

  private initReactiveForm(): void {
    this.registrationForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
        acceptTermsAndConditions: [false, [Validators.requiredTrue]],
      },
      {
        validators: [mustMatch('password', 'passwordConfirm')],
      }
    );
  }

  public errorHandling(controlName: string, error: string): boolean {
    const control = this.registrationForm.controls[controlName];
    if (control === undefined) {
      console.error('unknown control name', controlName);
      return false;
    }
    return control.hasError(error);
  }

  submitForm(): void {
    // TODO: does "acceptTermsAndConditions" stay in the API?
    // adding it for now so registration can work again...
    if (this.registrationForm.valid) {
      const { email, password, acceptTermsAndConditions } =
        this.registrationForm.value;
      this.authenticationService
        .register({ email, password, acceptTermsAndConditions })
        .subscribe((response) => {
          if (response.isSuccess) {
            this.router.navigate(['verify-account'], {
              relativeTo: this.route.parent,
            });
          } else {
            this.error = response.error;
          }
        });
    }
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .loginAsHuman(captchaToken)
      .subscribe((response) => {
        if (response.isSuccess) {
          console.info('human session created');
          this.loggedInAsHuman = true;
        } else {
          console.error('error while establishing human session');
        }
      });
  }
}
