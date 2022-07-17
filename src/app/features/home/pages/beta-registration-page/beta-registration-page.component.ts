import { Component } from '@angular/core';
import { SignupType } from '@features/home/types/signup.type';

@Component({
  selector: 'app-beta-registration-page',
  templateUrl: './beta-registration-page.component.html',
  styleUrls: ['./beta-registration-page.component.scss'],
})
export class BetaRegistrationPageComponent{

  signupType: SignupType = 'customer';

  constructor() {}

}
