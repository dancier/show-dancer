import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChatConversationListEntryComponent } from './chat-conversation-list-entry.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { ChatStateService } from '../../page/chat-page-new/chat-state.service';

@Component({
  selector: 'app-chat-conversation-list',
  template: `
    <app-chat-conversation-list-entry
      *ngFor="
        let conversation of chatState.chats();
        trackBy: trackByConversationId
      "
      [conversation]="conversation"
    >
    </app-chat-conversation-list-entry>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { role: 'list' },
  standalone: true,
  imports: [NgFor, ChatConversationListEntryComponent, AsyncPipe],
})
export class ChatConversationListComponent {
  chatState = inject(ChatStateService);
  // constructor(public chatStore: ChatStore) {}
  //
  // source = interval(1000);
  //
  trackByConversationId(index: number, conversation: Conversation): string {
    return conversation.chatId;
  }
}
