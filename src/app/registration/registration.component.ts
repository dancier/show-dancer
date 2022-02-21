import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserRegistration } from '../shared/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
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
