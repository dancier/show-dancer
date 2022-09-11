import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@data/services/profile.service';
import { DanceLevel, DanceRole, DanceTypes } from '@data/types/profile.types';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DanceForm } from '@features/profile/components/dance-type/dance-form.type';


@Component({
  selector: 'app-edit-partner-able-to-dance',
  templateUrl: './edit-partner-able-to-dance.component.html',
  styleUrls: ['./edit-partner-able-to-dance.component.scss']
})
export class EditPartnerAbleToDanceComponent{


  // wantsTo: Dance[] = [{
  //   dance: undefined,
  //   level: undefined,
  //   leading: undefined
  // }];

  form = new FormGroup({
    dances: new FormArray<FormGroup<DanceForm>>([])
  });

  constructor(
    public profileDataService: ProfileService,
    private router: Router,
  ) {
    this.form.valueChanges.subscribe((changes) => {
      console.log(changes);
    })
  }

  addDance(): void {
    // this.wantsTo.push(this.createNewEmptyDance());
    const danceForm = new FormGroup<DanceForm>({
      type: new FormControl<DanceTypes>('STANDARD', { nonNullable: true }),
      leading: new FormControl<DanceRole>('LEADING', { nonNullable: true }),
      level: new FormControl<DanceLevel>('BASIC', { nonNullable: true }),
    });
    this.form.controls.dances.push(danceForm);
  }

  get dancesFormArray(): FormArray<FormGroup<DanceForm>> {
    return this.form.controls.dances;
  }

  // createNewEmptyDance(): Dance {
  //   // return {
  //   //   dance: undefined,
  //   //   level: undefined,
  //   //   leading: undefined
  //   // }
  // }

  removeDance(index: number): void {
    if (this.dancesFormArray.length > 0) {
      this.dancesFormArray.removeAt(index);
    }
    // if (this.wantsTo.length > 1) {
    //   this.wantsTo.splice(index, 1);
    // }
  }
  submitForm(): void {
    // this.profileDataService.setPartnerDances(this.wantsTo as DancePreferences[]);
    // this.profileDataService.updateProfile()
    // this.router.navigate(['profile'])
  }
}
