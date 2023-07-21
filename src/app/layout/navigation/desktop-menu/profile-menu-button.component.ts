import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProfileService } from '@shared/profile/profile.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-menu-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      id="user-menu-button"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-10 w-10 rounded-full border border-gray-50"
        alt=""
        [src]="profileService.getProfileImageSrc() | async"
      />
    </button>
  `,
  standalone: true,
  imports: [AsyncPipe],
})
export class ProfileMenuButtonComponent {
  public profileService = inject(ProfileService);
}
