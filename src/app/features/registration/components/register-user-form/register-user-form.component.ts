import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mustMatch } from '@core/validators/mustMatch';
import { Subscription } from 'rxjs';
import { APIError } from '@data/types/shared.types';
import { errorMessages } from '@data/constants/error-messages';
import { isRight, unwrapEither } from '@data/types/either';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit, OnDestroy {

  registrationForm!: UntypedFormGroup;
  error?: APIError;
  formStatusSubscription: Subscription | undefined;
  loggedInAsHuman = false;
  errorMessages = errorMessages;

  constructor(
    private fb: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initReactiveForm();
  }

  ngOnDestroy(): void {
    this.formStatusSubscription?.unsubscribe();
  }

  private initReactiveForm(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      acceptTermsAndConditions: [false, [Validators.requiredTrue]],
    }, {
      validators: [mustMatch('password', 'passwordConfirm')],
    });
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
      const { email, password, acceptTermsAndConditions } = this.registrationForm.value;
      this.authenticationService
        .onceUserRegistered({ email, password, acceptTermsAndConditions })
          .subscribe((response) => {
          if (isRight(response)) {
            this.router.navigate(['verify-account'], { relativeTo: this.route.parent });
          } else {
            this.error = unwrapEither(response)
          }
        });
    }
  }

  captchaResolved(captchaToken: string): void {
    this.authenticationService
      .onceHumanLoggedIn(captchaToken)
      .subscribe((response) => {
        if (isRight(response)) {
          console.info('human session created');
          this.loggedInAsHuman = true;
        } else {
          console.error('error while establishing human session');
        }
      });
  }
}
