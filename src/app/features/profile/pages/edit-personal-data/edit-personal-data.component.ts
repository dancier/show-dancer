import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
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
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.initReactiveForm();
  }

  private initReactiveForm(): void {
    this.personalDataForm = this.fb.group({
      birthday: [],
      zip: ['', ],
      gender: [],
      height: []
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
      // eslint-disable-next-line no-console
      console.log(this.personalDataForm.value);
      // routerLink="../dances-self"
    }
  }
}
