import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '@shared/data-access/profile/profile.service';
import { DisplayDanceLevelPipe } from '../util/pipes/display-dance-level.pipe';
import { DisplayDanceRolePipe } from '../util/pipes/display-dance-role.pipe';
import { AgePipe } from '@shared/util/age.pipe';

@Component({
  selector: 'app-profile-new',
  standalone: true,
  imports: [CommonModule, DisplayDanceLevelPipe, DisplayDanceRolePipe, AgePipe],
  template: `
    <ng-container *ngIf="profileService.profile$ | async as profile">
      <div class="my-12 mx-auto flex max-w-[1200px] gap-10 px-10 lg:px-10">
        <div class="lg:px-16">
          <img
            class="rounded-full"
            alt="Profile Image"
            [src]="profileService.getProfileImageSrc(250) | async"
          />
        </div>
        <div class="grow">
          <h1 class="page-header">
            <span class="text-gray-500">Profil von</span>
            {{ profile.dancerName }}
          </h1>

          <button
            class="mb-4 flex items-center gap-2 rounded-full border border-red-800 fill-red-800 px-3 py-1 text-red-800 transition-colors hover:bg-red-800 hover:fill-white hover:text-white"
          >
            <div class="grow-0">
              <svg class="h-6 w-6">
                <use href="assets/icons/bootstrap-icons.svg#chat-dots" />
              </svg>
            </div>
            <div class="grow-0">Jetzt chatten</div>
          </button>

          <div
            class="flex items-center gap-x-7 gap-y-4 border-t border-b px-2 py-4"
          >
            <div class="grow-0">
              <svg class="h-10 w-10">
                <use href="assets/icons/bootstrap-icons.svg#buildings" />
              </svg>
            </div>
            <div class="grow">
              <div class="mb-0.5 text-sm text-gray-500">Wohnort</div>
              <div class="text-2xl">{{ profile.city }}</div>
            </div>
          </div>

          <div class="flex items-center gap-x-7 gap-y-4 border-b px-2 py-4">
            <div class="grow-0">
              <svg class="h-10 w-10">
                <use href="assets/icons/bootstrap-icons.svg#calendar3" />
              </svg>
            </div>
            <div class="grow">
              <div class="mb-0.5 text-sm text-gray-500">Alter</div>
              <div class="text-2xl">{{ profile.birthDate | age }}</div>
            </div>
          </div>

          <div class="flex items-center gap-x-7 gap-y-4 border-b px-2 py-4">
            <div class="grow-0">
              <svg class="h-10 w-10">
                <use href="assets/icons/bootstrap-icons.svg#arrows-vertical" />
              </svg>
            </div>
            <div class="grow">
              <div class="mb-0.5 text-sm text-gray-500">Körpergröße</div>
              <div class="text-2xl">{{ profile.size }} cm</div>
            </div>
          </div>

          <div class="flex items-center gap-x-7 gap-y-4 border-b px-2 py-4">
            <div class="grow-0">
              <svg class="h-10 w-10">
                <use href="assets/icons/bootstrap-icons.svg#gender-ambiguous" />
              </svg>
            </div>
            <div class="grow">
              <div class="mb-0.5 text-sm text-gray-500">Geschlecht</div>
              <div class="text-2xl">{{ profile.gender }}</div>
            </div>
          </div>

          <div
            *ngFor="let danceExperience of profile.ableTo"
            class="flex items-center gap-x-7 gap-y-4 border-b px-2 py-4"
          >
            <div class="grow-0">
              <svg class="h-10 w-10">
                <use
                  href="assets/icons/bootstrap-icons.svg#music-note-beamed"
                />
              </svg>
            </div>
            <div class="grow">
              <div class="mb-0.5 text-sm text-gray-500">Tanzerfahrung</div>
              <div class="text-2xl">
                {{ danceExperience.level | displayDanceLevel }},
                {{ danceExperience.leading | displayDanceRole }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileNewComponent {
  profileService = inject(ProfileService);
}

/**
 * Icons:
 * Wohnort: buildings
 * Alter: calendar3
 * Körpergröße: arrows-vertical
 * Geschlecht: gender-ambiguous
 * Tanzerfahrung / Tanz: music-note-beamed
 */
