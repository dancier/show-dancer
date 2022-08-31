import { Component } from '@angular/core';
import { ProfileService } from '@data/services/profile.service';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss']
})
export class EditPersonalDataComponent {

  isBirthdayFieldOnFocus: boolean = false;
  isGenderFieldOnFocus: boolean = false;
  isHeightFieldOnFocus: boolean = false;
  isZipFieldOnFocus: boolean = false;

  constructor(public profileDataService: ProfileService,) {
  }

  birthdayFieldOnFocus(): void {
    this.isBirthdayFieldOnFocus = true;
  }

  birthdayFieldOnBlur(): void {
    this.isBirthdayFieldOnFocus = false;
  }

  genderFieldOnFocus(): void {
    this.isGenderFieldOnFocus = true;
  }

  genderFieldOnBlur(): void {
    this.isGenderFieldOnFocus = false;
  }

  heightFiledOnFocus(): void {
    this.isHeightFieldOnFocus = true;
  }

  heightFieldOnBlur(): void {
    this.isHeightFieldOnFocus = false;
  }

  zipFieldOnFocus(): void {
    this.isZipFieldOnFocus = true;
  }

  zipFieldOnBlur(): void {
    this.isZipFieldOnFocus = false;
  }

}
