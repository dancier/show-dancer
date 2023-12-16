import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileOldService } from '@shared/data-access/profile/profile-old.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DanceExperienceForm } from '../../../ui/dance-experience-form/dance-form.type';
import { Dance } from '../../../data-access/types/profile.types';
import { APIError } from '@shared/util/http/response.types';
import { ErrorMessagePipe } from '@shared/util/http/error-message.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { DanceExperienceFormComponent } from '../../../ui/dance-experience-form/dance-experience-form.component';

@Component({
  selector: 'app-init-partner-dance-experience',
  templateUrl: './init-partner-dance-experience.component.html',
  styleUrls: ['./init-partner-dance-experience.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DanceExperienceFormComponent,
    NgIf,
    MatFormFieldModule,
    MatButtonModule,
    ErrorMessagePipe,
  ],
})
export class InitPartnerDanceExperienceComponent {
  form = new FormGroup<Partial<DanceExperienceForm>>({});

  apiError?: APIError;

  constructor(
    public profileService: ProfileOldService,
    private router: Router
  ) {}

  submitForm(): void {
    if (this.form.valid && this.form.value.dances) {
      // iterate over the values from the dances form array and map them to a Dance array
      const dances: Dance[] = this.form.value.dances.map((danceEntry) => ({
        dance: danceEntry.dance!,
        leading: danceEntry.leading!,
        level: danceEntry.level!,
      }));
      this.profileService.setPartnerDances(dances).subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate(['profile/initial-setup/profile-image']);
        } else {
          this.apiError = response.error;
        }
      });
    } else {
      // display error messages for all invalid controls
      this.form.markAllAsTouched();
    }
  }
}
