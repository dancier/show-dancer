import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { OwnProfileService } from '../../../../data-access/profile/own-profile.service';
import { AsyncPipe } from '@angular/common';
import { handleAutoChangeDetectionStatus } from '@angular/cdk/testing';

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
      (click)="profileButtonClicked.emit()"
    >
      <span class="sr-only">Open user menu</span>
      <img
        class="h-10 w-10 rounded-full border border-gray-50"
        alt=""
        [src]="profileService.getProfileImageSrc() | async"
        (error)="handleMissingProfileImage($event)"
      />
    </button>
  `,
  standalone: true,
  imports: [AsyncPipe],
})
export class ProfileMenuButtonComponent {
  @Output()
  profileButtonClicked = new EventEmitter<void>();

  public profileService = inject(OwnProfileService);
  protected readonly handleAutoChangeDetectionStatus =
    handleAutoChangeDetectionStatus;

  handleMissingProfileImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.profileService.getDefaultProfileImage();
  }
}
