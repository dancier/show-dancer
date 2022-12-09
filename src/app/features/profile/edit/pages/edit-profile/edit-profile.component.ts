import { Component } from "@angular/core";
import { FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { APIError } from "@shared/http/response.types";
import { ProfileService } from "../../../common/services/profile.service";
import { Profile } from "../../../common/types/profile.types";
import { Router } from "@angular/router";
import { format } from "date-fns";
import { PersonalDataForm } from "../../components/personal-data-form/personal-data-form.types";
import { de } from "date-fns/locale";
import { DanceExperienceForm } from "../../components/dance-experience-form/dance-form.type";

type EditProfileForm = {
  personalData: FormGroup<Partial<PersonalDataForm>>;
  ownDances: FormGroup<Partial<DanceExperienceForm>>;
  partnerDances: FormGroup<Partial<DanceExperienceForm>>;
};

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  profileForm = new FormGroup<EditProfileForm>({
    personalData: new FormGroup({}),
    ownDances: new FormGroup({}),
    partnerDances: new FormGroup({}),
  });
  error?: APIError;

  constructor(
    private fb: NonNullableFormBuilder,
    public profileService: ProfileService,
    private router: Router
  ) {}

  saveProfile(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.getRawValue();
      const profile: Partial<Profile> = {
        size: formValues.personalData!.size!,
        birthDate: format(formValues.personalData!.birthDate!, 'yyyy-MM-dd', {
          locale: de,
        }),
        city: formValues.personalData.city!,
        gender: formValues.personalData.gender!,
        zipCode: formValues.personalData.zipCode!,
        ableTo: formValues.ownDances.dances!.map((danceEntry) => ({
          dance: danceEntry.dance!,
          leading: danceEntry.leading!,
          level: danceEntry.level!,
        })),
        wantsTo: formValues.partnerDances.dances!.map((danceEntry) => ({
          dance: danceEntry.dance!,
          leading: danceEntry.leading!,
          level: danceEntry.level!,
        })),
      };
      this.profileService.setProfile(profile).subscribe((response) => {
        if (response.isSuccess) {
          this.router.navigate(['profile']);
        } else {
          this.error = response.error;
        }
      });
    } else {
      // display error messages for all invalid controls
      this.profileForm.markAllAsTouched();
    }
  }
}
