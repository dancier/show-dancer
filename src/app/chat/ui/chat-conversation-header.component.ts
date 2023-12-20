import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatStateService } from '../data-access/chat-state.service';
import { ChatParticipant, DancerId } from '../data-access/chat.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../profile/data-access/types/profile.types';
import { map } from 'rxjs';
import { ImageService } from '@shared/data-access/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-conversation-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white">
      <button
        class="w-full border px-6 py-2 text-left text-lg text-red-700 md:hidden"
        (click)="returnToConversationList()"
      >
        &larr; Zurück zur Übersicht
      </button>
      <div
        *ngIf="participant()"
        class="border-b bg-gray-50 px-6 py-3 hover:cursor-pointer hover:bg-gray-100"
        tabindex="0"
        (click)="navigateToProfile(participant()!.id)"
      >
        <div class="flex gap-4">
          <div class=" h-12 w-12 overflow-hidden rounded-full object-cover">
            <img
              class=""
              [src]="
                imageService.getDancerImageSrcOrDefault(
                  participant()!.profileImageHash,
                  48
                )
              "
              [attr.alt]="'Profile Image of' + participant()!.dancerName"
              (error)="handleMissingImage($event)"
            />
          </div>
          <div>
            <div class="text-lg">{{ participant()?.dancerName }}</div>
            <div class="text-sm text-gray-600">Zum Profil wechseln</div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationHeaderComponent {
  private chatState = inject(ChatStateService);
  public imageService = inject(ImageService);
  private router = inject(Router);

  ownProfileId: Signal<string | undefined> = toSignal(
    inject(OwnProfileService).profile$.pipe(
      startWith({
        id: 'dancerId1',
      } as Profile),
      map((profile) => profile.id)
    )
  );

  participant: Signal<ChatParticipant | undefined> = computed(() => {
    const participant = this.ownProfileId()
      ? this.chatState
          .activeChatParticipants()
          .find((participant) => participant.id !== this.ownProfileId())
      : undefined;
    return participant;
  });

  returnToConversationList(): void {
    this.chatState.selectChat$.next(null);
  }

  handleMissingImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.imageService.getDefaultDancerImage();
  }

  navigateToProfile(id: DancerId): void {
    this.router.navigate(['profile', 'view', id]);
  }
}
