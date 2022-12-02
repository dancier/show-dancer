import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ProfileService } from "../../../common/services/profile.service";
import { FormGroup } from "@angular/forms";
import { DanceExperienceForm } from "../../components/dance-experience-form/dance-form.type";
import { Dance } from "../../../common/types/profile.types";
import { APIError } from "@shared/http/response.types";

@Component({
  selector: 'app-init-dance-experience',
  templateUrl: './init-dance-experience.component.html',
  styleUrls: ['./init-dance-experience.component.scss'],
})
export class InitDanceExperienceComponent {
  form = new FormGroup<Partial<DanceExperienceForm>>({});

  apiError?: APIError;

  constructor(public profileService: ProfileService, private router: Router) {}

  submitForm(): void {
    if (this.form.valid && this.form.value.dances) {
      // iterate over the values from the dances form array and map them to a Dance array
      const dances: Dance[] = this.form
        .getRawValue()
        .dances!.map((danceEntry) => ({
          dance: danceEntry.dance!,
          leading: danceEntry.leading!,
          level: danceEntry.level!,
        }));
      this.profileService.setOwnDances(dances).subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate(['profile/initial-setup/dances-partner']);
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
