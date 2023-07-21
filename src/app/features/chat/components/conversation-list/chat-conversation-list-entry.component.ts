import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ChatParticipant, Conversation } from '../../common/types/chat.types';
import { ImageService } from '@shared/image/image.service';
import { ChatStore } from '../../common/services/chat.store';
import { ProfileService } from '@shared/profile/profile.service';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NgIf, NgClass, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-conversation-list-entry',
  template: `
    <ng-container *ngIf="{ isSelected: isSelected$ | async } as vm">
      <div
        *ngIf="conversation"
        class="flex cursor-pointer items-center gap-6 px-6 py-4 hover:bg-gray-50 active:bg-gray-50"
        tabindex="0"
        data-testid="chat-list-entry"
        [ngClass]="{ 'bg-gray-100': vm.isSelected }"
        (click)="selectConversation()"
      >
        <div class="h-20 w-20 overflow-hidden rounded-full object-cover">
          <img
            class=""
            [src]="
              imageService.getDancerImageSrcOrDefault(
                participant!.profileImageHash,
                80
              )
            "
            [attr.alt]="'Profile Image of ' + participant!.dancerName"
          />
        </div>
        <div class="flex flex-col gap-1">
          <div class="text-2xl">{{ participant!.dancerName }}</div>
          <div class="text-lg text-gray-600">
            {{ participant!.city }}
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
export class ChatConversationListEntryComponent implements OnInit {
  isSelected$?: Observable<boolean>;

  @Input()
  conversation?: Conversation;

  participant?: ChatParticipant;

  ownProfileId?: string;

  constructor(
    public imageService: ImageService,
    public chatStore: ChatStore,
    public profileService: ProfileService,
    public router: Router
  ) {
    this.profileService.profile$.subscribe((profile) => {
      this.ownProfileId = profile.id;
    });
  }

  ngOnInit(): void {
    if (!this.conversation) {
      return;
    }
    this.participant = this.conversation.participants.find(
      (participant) => participant.id !== this.ownProfileId
    );
    this.isSelected$ = this.chatStore.selectedConversationId$.pipe(
      map((conversationId) => {
        return conversationId === this.conversation?.chatId;
      })
    );
  }

  selectConversation(): void {
    if (!this.conversation) {
      return;
    }
    this.chatStore.selectConversation(this.conversation.chatId);
    this.router.navigate(['/chat', this.participant?.id], {
      replaceUrl: true,
    });
  }
}
