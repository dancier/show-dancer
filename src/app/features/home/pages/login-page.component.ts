import { Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  template: ` <app-login-form></app-login-form> `,
  standalone: true,
  imports: [LoginFormComponent],
})
export class LoginPageComponent {
  constructor() {}
}
