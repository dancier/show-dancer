import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { RegistrationResponse, UserRegistration } from '@data/types/authentication.types';
import { ActivatedRoute, Router } from '@angular/router';

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

  public resolved(foo: any): void {
    console.log("The Code " + foo);
  }

  private initReactiveForm(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public errorHandling(control: string, error: string): boolean {
    return this.registrationForm.controls[control].hasError(error);
  }

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.authenticationService
        .onceUserRegistered(this.registrationForm.value as UserRegistration)
        .subscribe((response) => {
          this.registrationAttemptResponse = response;
          if (response === 'SUCCESS') {
            this.router.navigate(['verify-account'], {relativeTo: this.route.parent});
          }
        });
    }
  }
}
