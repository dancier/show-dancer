import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DanceLevel,
  DanceRole,
  DanceType,
  Profile,
} from '../../data-access/types/profile.types';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { Router } from '@angular/router';
import { DanceExperienceEntryForm } from './dance-form.type';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { DanceExperienceEntryComponent } from './dance-experience-entry/dance-experience-entry.component';
import { NgFor, NgIf } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-dance-experience-form',
  templateUrl: './dance-experience-form.component.html',
  styleUrls: ['./dance-experience-form.component.scss'],
  imports: [
    NgFor,
    DanceExperienceEntryComponent,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
  ],
})
export class DanceExperienceFormComponent implements OnInit {
  profileService = inject(OwnProfileService);
  private router = inject(Router);
  private formGroupDirective = inject(FormGroupDirective);

  danceExperiences = new FormArray<FormGroup<DanceExperienceEntryForm>>([]);

  @Input() danceFormType: 'own' | 'partner' = 'own';

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
