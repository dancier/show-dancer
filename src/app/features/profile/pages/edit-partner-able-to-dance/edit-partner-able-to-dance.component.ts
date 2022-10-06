import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@features/profile/services/profile.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DanceForm } from '@features/profile/components/dance-type/dance-form.type';
import {
  Dance,
  DanceLevel,
  DanceRole,
  DanceType,
} from '@features/profile/types/profile.types';

@Component({
  selector: 'app-edit-partner-able-to-dance',
  templateUrl: './edit-partner-able-to-dance.component.html',
  styleUrls: ['./edit-partner-able-to-dance.component.scss'],
})
export class EditPartnerAbleToDanceComponent implements OnInit {
  form = new FormGroup({
    dances: new FormArray<FormGroup<DanceForm>>([]),
  });

  constructor(
    public profileDataService: ProfileService,
    private router: Router
  ) {
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
      dance: new FormControl<DanceType>('', { nonNullable: true }),
      leading: new FormControl<DanceRole>('LEADING', { nonNullable: true }),
      level: new FormControl<DanceLevel>('BASIC', { nonNullable: true }),
    });
    this.form.controls.dances.push(danceForm);
  }

  removeDance(index: number): void {
    if (this.dancesFormArray.length > 0) {
      this.dancesFormArray.removeAt(index);
    }
  }

  submitForm(): void {
    const dances: Dance[] = this.dancesFormArray
      .getRawValue()
      .map((danceForm) => ({
        dance: danceForm.dance,
        leading: danceForm.leading,
        level: danceForm.level,
      }));
    this.profileDataService.setPartnerDances(dances);
    this.profileDataService.updateProfile();
    console.debug('profile', this.profileDataService.profile);
    this.router.navigate(['profile']);
  }
}
