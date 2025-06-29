import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { DisplayDanceLevelPipe } from '../util/pipes/display-dance-level.pipe';
import { DisplayDanceRolePipe } from '../util/pipes/display-dance-role.pipe';
import { AgePipe } from '@shared/util/age.pipe';
import { DisplayGenderPipe } from '../util/pipes/display-gender.pipe';
import { Router } from '@angular/router';
import { ProfileDataEntryComponent } from '../ui/profile-data-entry.component';
import { ImageService } from '@shared/data-access/image.service';

@Component({
  selector: 'app-own-profile',
  standalone: true,
  imports: [
    CommonModule,
    DisplayDanceLevelPipe,
    DisplayDanceRolePipe,
    AgePipe,
    DisplayGenderPipe,
    ProfileDataEntryComponent,
  ],
  template: `
    @if (profileService.profile$ | async; as profile) {
      <div
        class="my-12 mx-auto flex max-w-[1200px] flex-col gap-10 px-4 md:flex-row md:px-10 lg:px-10"
      >
        <div class="mx-auto lg:px-16">
          <img
            class="relative h-[250px] w-[250px] max-w-none rounded-full"
            alt="Profile Image"
            [src]="profileService.getProfileImageSrc(250) | async"
            (error)="handleMissingImage($event)"
          />
        </div>
        <div class="grow">
          <h1 class="page-header">
            <span class="text-gray-500">Profil von</span>
            {{ profile.dancerName }}
          </h1>

          <button
            class="mb-4 flex items-center gap-2 rounded border border-red-800 fill-red-800 px-3 py-1 text-red-800 transition-colors hover:bg-red-50"
            (click)="editProfile()"
          >
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use href="assets/icons/bootstrap-icons.svg#pencil" />
              </svg>
            </div>
            <div class="grow-0">Profil bearbeiten</div>
          </button>

          @if (profile.aboutMe) {
            <app-profile-data-entry
              icon="info-square"
              label="Über mich"
              class="block border-t"
              [value]="profile.aboutMe"
            ></app-profile-data-entry>
          }

          @if (profile.city) {
            <app-profile-data-entry
              icon="buildings"
              label="Wohnort"
              [value]="profile.city"
            ></app-profile-data-entry>
          }

          @if (profile.birthDate) {
            <app-profile-data-entry
              icon="calendar3"
              label="Alter"
              [value]="profile.birthDate | age"
            ></app-profile-data-entry>
          }

          @if (profile.size) {
            <app-profile-data-entry
              icon="arrows-vertical"
              label="Körpergröße"
              [value]="profile.size + ' cm'"
            ></app-profile-data-entry>
          }

          @if (profile.gender) {
            <app-profile-data-entry
              icon="gender-ambiguous"
              label="Geschlecht"
              [value]="profile.gender | displayGender"
            ></app-profile-data-entry>
          }

          @for (
            danceExperience of profile.ableTo;
            track danceExperience.dance
          ) {
            <app-profile-data-entry
              icon="music-note-beamed"
              label="Tanzerfahrung"
              [value]="
                danceExperience.dance +
                ' (' +
                (danceExperience.level | displayDanceLevel) +
                ', ' +
                (danceExperience.leading | displayDanceRole) +
                ')'
              "
            ></app-profile-data-entry>
          }
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnProfileComponent {
  imageService = inject(ImageService);
  profileService = inject(OwnProfileService);
  router = inject(Router);

  editProfile(): void {
    this.router.navigate(['profile', 'edit']);
  }

  handleMissingImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.imageService.getDefaultDancerImage();
  }
}
