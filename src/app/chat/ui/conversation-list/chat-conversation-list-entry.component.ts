import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChatStateService,
  SingleChatState,
} from '../../data-access/chat-state.service';
import { ImageService } from '@shared/data-access/image.service';
import { ChatParticipant } from '../../data-access/chat.types';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-conversation-list-entry',
  standalone: true,
  template: `
    @if (conversation() && participant()) {
      <div
        class="active:bg-gray-150 mx-2 my-0.5 flex cursor-pointer items-center gap-6 rounded border border-white px-4 py-3 hover:bg-gray-100"
        tabindex="0"
        [attr.data-testid]="
          isSelected() ? 'chat-list-selected-entry' : 'chat-list-entry'
        "
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
        <div
          class="flex grow flex-col gap-0"
          [ngClass]="{ 'font-bold': hasUnreadMessages() }"
        >
          <div class="truncate text-2xl">
            {{ participant()!.dancerName }}
          </div>
          <div class="truncate text-lg text-gray-600">
            {{ participant()!.city }}
          </div>
        </div>
        @if (hasUnreadMessages()) {
          <div
            class="h-2 w-2 grow-0 rounded-full bg-teal-500 fill-teal-500"
          ></div>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line
  host: { role: 'listitem' },
  imports: [CommonModule],
})
export class ChatConversationListEntryComponent {
  chatState = inject(ChatStateService);
  ownProfileId: Signal<string | undefined> = toSignal(
    inject(OwnProfileService).profile$.pipe(map((profile) => profile.id))
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

  hasUnreadMessages: Signal<boolean> = computed(() => {
    if (!this.conversation()?.lastMessage || !this.ownProfileId()) {
      return false;
    }
    return !this.conversation()!.lastMessage!.readByParticipants?.includes(
      this.ownProfileId()!
    );
  });

  handleMissingImage($event: ErrorEvent): void {
    ($event.target as HTMLImageElement).src =
      this.imageService.getDefaultDancerImage();
  }
}
