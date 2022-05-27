import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { RegistrationResponse } from '@data/types/authentication.types';
import { ActivatedRoute, Router } from '@angular/router';
import { mustMatch } from '@core/validators/mustMatch';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit {

  registrationForm!: FormGroup;
  registrationAttemptResponse: RegistrationResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  public captchaResolved(token: string | null): void {
    this.registrationForm.setValue({"captchaToken": "bar"})
  }

  private initReactiveForm(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
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
    if (this.registrationForm.valid) {
      const {email, password, captcha} = this.registrationForm.value;
      this.authenticationService
        .onceUserRegistered({email, password}, captcha)
        .subscribe((response) => {
          this.registrationAttemptResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['verify-account'], {relativeTo: this.route.parent});
          }
        });
    }
  }
}
