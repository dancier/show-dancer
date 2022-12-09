import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  DanceLevel,
  DanceRole,
  DanceType,
  Profile,
} from '../../../common/types/profile.types';
import { ProfileService } from '../../../common/services/profile.service';
import { Router } from '@angular/router';
import { DanceExperienceEntryForm } from './dance-form.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-dance-experience-form',
  templateUrl: './dance-experience-form.component.html',
  styleUrls: ['./dance-experience-form.component.scss'],
})
export class DanceExperienceFormComponent implements OnInit {
  danceExperiences = new FormArray<FormGroup<DanceExperienceEntryForm>>([]);

  @Input() danceFormType: 'own' | 'partner' = 'own';

  constructor(
    public profileService: ProfileService,
    private router: Router,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.formGroupDirective.form.addControl('dances', this.danceExperiences);
    this.addDance();
    this.patchForm();
  }

  addDance(): void {
    const danceForm = new FormGroup<DanceExperienceEntryForm>({
      dance: new FormControl<DanceType>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      leading: new FormControl<DanceRole>('LEAD', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      level: new FormControl<DanceLevel>('BASIC', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
    this.danceExperiences.push(danceForm);
  }

  removeDance(index: number): void {
    if (this.danceExperiences.length > 0) {
      this.danceExperiences.removeAt(index);
    }
  }

  private patchForm(): void {
    this.profileService.profile$
      .pipe(
        untilDestroyed(this),
        map((profile: Profile) => {
          if (this.danceFormType === 'own') {
            return profile.ableTo;
          } else {
            return profile.wantsTo;
          }
        })
      )
      .subscribe((dances) => {
        // remove initial empty control when there is existing data
        if (dances.length > 0) {
          this.danceExperiences.removeAt(0);
        }
        // add control and patch value for each dance
        dances.forEach((dance) => {
          this.addDance();
          this.danceExperiences
            .at(this.danceExperiences.length - 1)
            .patchValue({
              dance: dance.dance,
              leading: dance.leading,
              level: dance.level,
            });
        });
      });
  }
}
