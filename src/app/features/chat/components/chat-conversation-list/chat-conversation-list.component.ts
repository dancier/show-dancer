import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DancerId } from '../../common/types/chat.types';
import { ChatStore } from '../../common/services/chat.store';

@Component({
  selector: 'app-chat-conversation-list',
  templateUrl: './chat-conversation-list.component.html',
  styleUrls: ['./chat-conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationListComponent {
  constructor(public chatStore: ChatStore) {}

  selectedConversation: DancerId = '1000';

  selectConversation(_conversationId: DancerId): void {
    // TODO: select conversation in store
  }
}
