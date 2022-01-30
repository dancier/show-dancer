import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';

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
      name: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
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
        .registerUser(this.registrationForm.value)
        .subscribe(
          () => {
            console.log('success');
          },
          (err) => {
            console.log('something terrible happened', err);
          }
        );
    }
  }
}