import { Component } from '@angular/core';
import { LoginFormComponent } from '../ui/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  template: ` <app-login-form></app-login-form> `,
  imports: [LoginFormComponent],
})
export class LoginPageComponent {
  constructor() {}
}
