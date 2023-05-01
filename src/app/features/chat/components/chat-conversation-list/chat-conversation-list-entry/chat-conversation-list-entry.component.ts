import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ChatParticipant,
  Conversation,
} from '../../../common/types/chat.types';
import { ImageService } from '@core/image/image.service';
import { ChatStore } from '../../../common/services/chat.store';
import { ProfileService } from '@core/profile/profile.service';

@Component({
  selector: 'app-chat-conversation-list-entry',
  templateUrl: './chat-conversation-list-entry.component.html',
  styleUrls: ['./chat-conversation-list-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'listitem' },
})
export class ChatConversationListEntryComponent implements OnInit {
  // @Input()
  // participant?: ChatParticipant;
  //
  // @Input()
  isSelected = false;
  //
  // @Output()
  // conversationSelected = new EventEmitter<void>();

  @Input()
  conversation?: Conversation;

  participant?: ChatParticipant;

  ownProfileId?: string;

  constructor(
    public imageService: ImageService,
    public chatStore: ChatStore,
    public profileService: ProfileService
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
  }

  selectConversation(): void {
    if (!this.conversation) {
      return;
    }
    this.chatStore.selectConversation(this.conversation.chatId);
  }
}
