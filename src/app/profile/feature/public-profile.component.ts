import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../data-access/profile.service';
import { AgePipe } from '@shared/util/age.pipe';
import { DisplayDanceLevelPipe } from '../util/pipes/display-dance-level.pipe';
import { DisplayDanceRolePipe } from '../util/pipes/display-dance-role.pipe';
import { DisplayGenderPipe } from '../util/pipes/display-gender.pipe';
import { ProfileDataEntryComponent } from '../ui/profile-data-entry.component';

@Component({
  selector: 'app-public-profile',
  standalone: true,
  imports: [
    CommonModule,
    AgePipe,
    DisplayDanceLevelPipe,
    DisplayDanceRolePipe,
    DisplayGenderPipe,
    ProfileDataEntryComponent,
  ],
  template: `
    <!--      TODO: loading and error view -->
    <ng-container *ngIf="profileResponse$ | async as profileResponse">
      <div
        *ngIf="
          profileResponse.fetchStatus === 'success' &&
          profileResponse.payload as profile
        "
        class="my-12 mx-auto flex max-w-[1200px] flex-col gap-10 px-4 md:flex-row md:px-10 lg:px-10"
      >
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

          <app-profile-data-entry
            *ngIf="profile.aboutMe"
            icon="info-square"
            label="Über mich"
            class="block border-t"
            [value]="profile.aboutMe"
          ></app-profile-data-entry>

          <app-profile-data-entry
            *ngIf="profile.city"
            icon="buildings"
            label="Wohnort"
            [value]="profile.city"
          ></app-profile-data-entry>

          <app-profile-data-entry
            *ngIf="profile.age"
            icon="calendar3"
            label="Alter"
            [value]="profile.age.toString()"
          ></app-profile-data-entry>

          <app-profile-data-entry
            *ngIf="profile.size"
            icon="arrows-vertical"
            label="Körpergröße"
            [value]="profile.size + ' cm'"
          ></app-profile-data-entry>

          <app-profile-data-entry
            *ngIf="profile.gender"
            icon="gender-ambiguous"
            label="Geschlecht"
            [value]="profile.gender | displayGender"
          ></app-profile-data-entry>

          <app-profile-data-entry
            *ngFor="let danceExperience of profile.ableTo"
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
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicProfileComponent {
  private readonly activeRoute = inject(ActivatedRoute);
  public readonly profileService = inject(ProfileService);
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
