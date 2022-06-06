import { Component } from '@angular/core';

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

  constructor() {
  }

  birthdayFieldOnFocus() {
    this.isBirthdayFieldOnFocus = true;
  }

  birthdayFieldOnBlur() {
    this.isBirthdayFieldOnFocus = false;
  }

  genderFieldOnFocus() {
    this.isGenderFieldOnFocus = true;
  }

  genderFieldOnBlur() {
    this.isGenderFieldOnFocus = false;
  }

  heightFiledOnFocus() {
    this.isHeightFieldOnFocus = true;
  }

  heightFieldOnBlur() {
    this.isHeightFieldOnFocus = false;
  }

  zipFieldOnFocus() {
    this.isZipFieldOnFocus = true;
  }

  zipFieldOnBlur() {
    this.isZipFieldOnFocus = false;
  }

}
