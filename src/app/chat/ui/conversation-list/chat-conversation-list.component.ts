import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatConversationListEntryComponent } from './chat-conversation-list-entry.component';
import {
  ChatStateService,
  SingleChatState,
} from '../../data-access/chat-state.service';

@Component({
  selector: 'app-chat-conversation-list',
  template: `
    @for (conversation of chatState.chats(); track conversation.id) {
      <app-chat-conversation-list-entry [conversationId]="conversation.id">
      </app-chat-conversation-list-entry>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line
  host: { role: 'list' },
  imports: [ChatConversationListEntryComponent],
})
export class ChatConversationListComponent {
  chatState = inject(ChatStateService);
  // constructor(public chatStore: ChatStore) {}
  //
  // source = interval(1000);
  //
  trackByConversationId(index: number, conversation: SingleChatState): string {
    return conversation.id;
  }
}
