import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChatStateService,
  SingleChatState,
} from '../../data-access/chat-state.service';
import { ImageService } from '@shared/data-access/image.service';
import { ChatParticipant } from '../../data-access/chat.types';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../../profile/data-access/types/profile.types';

@Component({
  selector: 'app-chat-conversation-list-entry',
  template: `
    <ng-container>
      <div
        *ngIf="conversation() && participant()"
        class="active:bg-gray-150 mx-2 my-0.5 flex cursor-pointer items-center gap-6 rounded border border-white px-4 py-3 hover:bg-gray-100"
        tabindex="0"
        data-testid="chat-list-entry"
        [ngClass]="{
          'bg-gray-100': isSelected(),
          'border-gray-300': isSelected()
        }"
        (click)="chatState.selectChat$.next(conversation()!.id)"
      >
        <div
          class="h-16 w-16 shrink-0 overflow-hidden rounded-full object-cover"
        >
          <img
            class=""
            [src]="
              imageService.getDancerImageSrcOrDefault(
                participant()!.profileImageHash,
                64
              )
            "
            [attr.alt]="'Profile Image of' + participant()!.dancerName"
            (error)="handleMissingImage($event)"
          />
        </div>
        <div class="flex flex-col gap-0">
          <div class="truncate text-2xl">
            {{ participant()!.dancerName }}
          </div>
          <div class="truncate text-lg text-gray-600">
            {{ participant()!.city }}
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'listitem' },
  standalone: true,
  imports: [NgIf, NgClass, AsyncPipe],
})
export class ChatConversationListEntryComponent {
  chatState = inject(ChatStateService);
  ownProfileId: Signal<string | undefined> = toSignal(
    inject(OwnProfileService).profile$.pipe(
      startWith({
        id: 'dancerId1',
      } as Profile),
      map((profile) => profile.id)
    )
  );
  imageService = inject(ImageService);

  @Input({ required: true })
  conversationId?: string;

  conversation: Signal<SingleChatState | undefined> = computed(() => {
    return this.chatState
      .chats()
      .find((chat) => chat.id === this.conversationId);
  });

  isSelected = computed(() => {
    return this.chatState.activeChatId() === this.conversation()?.id;
  });

  participant: Signal<ChatParticipant | undefined> = computed(() => {
    return this.ownProfileId()
      ? this.conversation()?.participants.find(
          (participant) => participant.id !== this.ownProfileId()
        )
      : undefined;
  });

  handleMissingImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.imageService.getDefaultDancerImage();
  }
}
