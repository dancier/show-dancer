import { Component } from '@angular/core';
import { SignupType } from '@features/home/types/signup.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beta-registration-page',
  templateUrl: './beta-registration-page.component.html',
  styleUrls: ['./beta-registration-page.component.scss'],
})
export class BetaRegistrationPageComponent{

  type: SignupType | undefined;

  constructor(
    private router: Router,
  ) {}

  onTypeChange(type: SignupType): void {
    this.type = type;
    if (type === 'contributor') {
      this.router.navigate(['contribute']);
    }
  }
}
