import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@data/services/authentication.service';
import { UserRegistration } from '@data/types/registration.types';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public errorHandling(control: string, error: string) {
    return this.registrationForm.controls[control].hasError(error);
  }

  submitForm() {
    if (this.registrationForm.valid) {
      this.authenticationService
        .registerUser(this.registrationForm.value as UserRegistration)
        .subscribe({
          next: () => {
            console.log('success');
          },
          error: (err) => {
            console.log('something terrible happened', err);
          }
        });
    }
  }
}
