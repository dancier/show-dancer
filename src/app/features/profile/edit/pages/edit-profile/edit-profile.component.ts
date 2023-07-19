import { Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { APIError, APIResponse } from '@shared/http/response.types';
import { ProfileService } from '@core/profile/profile.service';
import { Profile, UploadedImageDao } from '../../../common/types/profile.types';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { PersonalDataForm } from '../../components/personal-data-form/personal-data-form.types';
import { de } from 'date-fns/locale';
import { DanceExperienceForm } from '../../components/dance-experience-form/dance-form.type';
import { ImageUploadService } from '../../../common/services/image-upload.service';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { ErrorMessagePipe } from '@shared/http/error-message.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DanceExperienceFormComponent } from '../../components/dance-experience-form/dance-experience-form.component';
import { PersonalDataFormComponent } from '../../components/personal-data-form/personal-data-form.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

type EditProfileForm = {
  personalData: FormGroup<Partial<PersonalDataForm>>;
  ownDances: FormGroup<Partial<DanceExperienceForm>>;
  partnerDances: FormGroup<Partial<DanceExperienceForm>>;
};

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    ImageCropperModule,
    PersonalDataFormComponent,
    ReactiveFormsModule,
    DanceExperienceFormComponent,
    MatFormFieldModule,
    AsyncPipe,
    ErrorMessagePipe,
  ],
})
export class EditProfileComponent {
  profileForm = new FormGroup<EditProfileForm>({
    personalData: new FormGroup({}),
    ownDances: new FormGroup({}),
    partnerDances: new FormGroup({}),
  });
  croppedImage?: string | null;
  imageChangedEvent: any = '';
  uploadResponse?: APIResponse<UploadedImageDao>;
  error?: APIError;

  constructor(
    private fb: NonNullableFormBuilder,
    public profileService: ProfileService,
    private imageUploadService: ImageUploadService,
    private router: Router
  ) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  private uploadProfilePicture(): void {
    this.imageUploadService
      .uploadImage$(this.croppedImage!)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.profileService.updateProfileImageHash(response.payload.hash);
        }
        this.uploadResponse = response;
      });
  }

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

      if (this.croppedImage) {
        this.uploadProfilePicture();
      }
    } else {
      // display error messages for all invalid controls
      this.profileForm.markAllAsTouched();
    }
  }
}
