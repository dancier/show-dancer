import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@features/profile/services/profile.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DanceForm } from '@features/profile/components/dance-type/dance-form.type';
import {
  Dance,
  DanceLevel,
  DanceRole,
  DanceType,
} from '@features/profile/types/profile.types';

@Component({
  selector: 'app-edit-able-to-dance',
  templateUrl: './edit-able-to-dance.component.html',
  styleUrls: ['./edit-able-to-dance.component.scss'],
})
export class EditAbleToDanceComponent implements OnInit {
  form = new FormGroup({
    dances: new FormArray<FormGroup<DanceForm>>([]),
  });

  constructor(public profileService: ProfileService, private router: Router) {
    this.form.valueChanges.subscribe((changes) => {
      console.info(changes);
    });
  }

  get dancesFormArray(): FormArray<FormGroup<DanceForm>> {
    return this.form.controls.dances;
  }

  ngOnInit(): void {
    this.addDance();
  }

  addDance(): void {
    const danceForm = new FormGroup<DanceForm>({
      dance: new FormControl<DanceType>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      leading: new FormControl<DanceRole>('LEADING', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      level: new FormControl<DanceLevel>('BASIC', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.form.controls.dances.push(danceForm);
  }

  removeDance(index: number): void {
    if (this.dancesFormArray.length > 0) {
      this.dancesFormArray.removeAt(index);
    }
  }

  submitForm(): void {
    if (this.form.valid) {
      // iterate over the values from the dances form array and map them to a Dance array
      const dances: Dance[] = this.dancesFormArray
        .getRawValue()
        .map((danceForm) => ({
          dance: danceForm.dance,
          leading: danceForm.leading,
          level: danceForm.level,
        }));
      this.profileService.setOwnDances(dances);
      this.router.navigate(['profile/initial-setup/dances-partner']);
    }
  }
}
