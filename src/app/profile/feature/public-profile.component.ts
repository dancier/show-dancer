import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicProfileService } from '../data-access/public-profile.service';
import { DisplayDanceLevelPipe } from '../util/pipes/display-dance-level.pipe';
import { DisplayDanceRolePipe } from '../util/pipes/display-dance-role.pipe';
import { DisplayGenderPipe } from '../util/pipes/display-gender.pipe';
import { ProfileDataEntryComponent } from '../ui/profile-data-entry.component';
import { AlertComponent } from '@shared/ui/alert/alert.component';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [
    CommonModule,
    DisplayDanceLevelPipe,
    DisplayDanceRolePipe,
    DisplayGenderPipe,
    ProfileDataEntryComponent,
    AlertComponent,
  ],
  template: `
    @if (profileResponse$ | async; as profileResponse) {
      <div
        class="my-12 mx-auto flex max-w-[1200px] flex-col gap-10 px-4 md:flex-row md:px-10 lg:px-10"
      >
        @if (
          profileResponse.fetchStatus === 'success' && profileResponse.payload;
          as profile
        ) {
          <div class="mx-auto lg:px-16">
            <!--            TODO: use pipe-->
            <img
              class="relative h-[250px] w-[250px] max-w-none rounded-full"
              alt="Profile Image"
              [src]="
                profileService.getProfileImageSrc(profile.profileImageHash, 250)
              "
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
              (click)="openChat(profile.id)"
            >
              <div class="grow-0">
                <svg class="h-6 w-6">
                  <use href="assets/icons/bootstrap-icons.svg#chat-dots" />
                </svg>
              </div>
              <div class="grow-0">Nachricht schreiben</div>
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

            @if (profile.age) {
              <app-profile-data-entry
                icon="calendar3"
                label="Alter"
                [value]="profile.age.toString()"
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
        }

        @if (profileResponse.fetchStatus === 'loading') {
          <div class="mx-auto lg:px-16">
            <div
              class="relative h-[250px] w-[250px] max-w-none animate-pulse rounded-full bg-gray-400"
            ></div>
          </div>
          <div class="grow">
            <div class="page-header">
              <div class="h-10 w-2/3 animate-pulse rounded bg-gray-300"></div>
            </div>
            <div class="border-b"></div>
            <div class="space-y-4 p-6">
              <div class="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
              <div class="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
            </div>
            <div class="border-b"></div>
          </div>
        }

        @if (profileResponse.fetchStatus === 'error') {
          <app-alert alertType="error" icon="error" class="mx-auto">
            <span>
              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später
              erneut.
            </span>
          </app-alert>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicProfileComponent {
  private readonly activeRoute = inject(ActivatedRoute);
  public readonly profileService = inject(PublicProfileService);
  private readonly router = inject(Router);

  public readonly profileResponse$ = this.profileService.getPublicProfile(
    this.activeRoute.snapshot.params['participantId']
  );

  handleMissingImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.profileService.getDefaultProfileImage();
  }

  openChat(dancerId: string): void {
    this.router.navigate(['chat'], {
      queryParams: { participantId: dancerId },
    });
  }
}
