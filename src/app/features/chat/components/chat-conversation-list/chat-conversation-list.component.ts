import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatStore } from '../../common/services/chat.store';
import { Conversation } from '../../common/types/chat.types';

@Component({
  selector: 'app-chat-conversation-list',
  templateUrl: './chat-conversation-list.component.html',
  styleUrls: ['./chat-conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'list' },
})
export class ChatConversationListComponent {
  constructor(public chatStore: ChatStore) {}

  trackByConversationId(index: number, conversation: Conversation): string {
    return conversation.chatId;
  }
}