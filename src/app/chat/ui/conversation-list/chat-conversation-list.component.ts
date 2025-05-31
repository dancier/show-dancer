import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatConversationListEntryComponent } from './chat-conversation-list-entry.component';
import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChatStateService,
  SingleChatState,
} from '../../data-access/chat-state.service';

@Component({
  selector: 'app-chat-conversation-list',
  template: `
    <app-chat-conversation-list-entry
      *ngFor="
        let conversation of chatState.chats();
        trackBy: trackByConversationId
      "
      [conversationId]="conversation.id"
    >
    </app-chat-conversation-list-entry>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line
  host: { role: 'list' },
  imports: [NgFor, ChatConversationListEntryComponent, AsyncPipe],
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
