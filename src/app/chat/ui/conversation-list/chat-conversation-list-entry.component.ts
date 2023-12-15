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
import { ProfileService } from '@shared/data-access/profile/profile.service';
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
        class="flex cursor-pointer items-center gap-6 px-6 py-4 hover:bg-gray-100 active:bg-gray-100"
        tabindex="0"
        data-testid="chat-list-entry"
        [ngClass]="{ 'bg-gray-100': isSelected() }"
        (click)="chatState.selectChat$.next(conversation()!.id)"
      >
        <div class="h-20 w-20 overflow-hidden rounded-full object-cover">
          <img
            class=""
            [src]="
              imageService.getDancerImageSrcOrDefault(
                participant()!.profileImageHash,
                80
              )
            "
            [attr.alt]="'Profile Image of' + participant()!.dancerName"
            (error)="handleMissingImage($event)"
          />
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-2xl">{{ participant()!.dancerName }}</div>
          <div class="text-lg text-gray-600">
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
    inject(ProfileService).profile$.pipe(
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

  // constructor() {
  //   effect(() => {
  //     console.log(this.participant());
  //   });
  // }

  // isSelected$?: Observable<boolean>;
  //
  // @Input()
  // conversation?: Conversation;
  //
  // participant?: ChatParticipant;
  //
  // ownProfileId?: string;
  //
  // constructor(
  //   public imageService: ImageService,
  //   public chatStore: ChatStore,
  //   public profileService: ProfileService,
  //   public router: Router
  // ) {
  //   this.profileService.profile$.subscribe((profile) => {
  //     this.ownProfileId = profile.id;
  //   });
  // }
  //
  // ngOnInit(): void {
  //   if (!this.conversation) {
  //     return;
  //   }
  //   this.participant = this.conversation.participants.find(
  //     (participant) => participant.id !== this.ownProfileId
  //   );
  //   this.isSelected$ = this.chatStore.selectedConversationId$.pipe(
  //     map((conversationId) => {
  //       return conversationId === this.conversation?.chatId;
  //     })
  //   );
  // }
  //
  // selectConversation(): void {
  //   if (!this.conversation) {
  //     return;
  //   }
  //   this.chatStore.selectConversation(this.conversation.chatId);
  //   this.router.navigate(['/chat', this.participant?.id], {
  //     replaceUrl: true,
  //   });
  // }
}