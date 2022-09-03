import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';

type Field = 'BIRTHDAY' | 'GENDER' | 'HEIGHT' | 'ZIP';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss'],
})
export class EditPersonalDataComponent implements OnInit {
  personalDataForm!: UntypedFormGroup;
  fieldInFocus?: Field;

  constructor(
    public profileDataService: ProfileService,
    private fb: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm(): void {
    this.personalDataForm = this.fb.group({
      birthdate: [],
      zipCode: ['', ],
      gender: [],
      size: []
    });
  }

  hasFocus(field: Field): boolean {
    return field === this.fieldInFocus
  }

  setFocus(field: Field): void {
    this.fieldInFocus = field;
  }

  unsetFocus(field: Field): void {
    if (this.fieldInFocus === field) {
      this.fieldInFocus = undefined
    }
  }

  submitForm(): void {
    if (this.personalDataForm.valid) {
      this.profileDataService.setPersonalData(this.personalDataForm.value);
      this.router.navigate(['profile/initial-setup/dances-self']);
    }
  }
}
