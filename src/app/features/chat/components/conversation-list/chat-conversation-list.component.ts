import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatStore } from '../../common/services/chat.store';
import { Conversation } from '../../common/types/chat.types';
import { ChatConversationListEntryComponent } from './chat-conversation-list-entry.component';
import { NgFor, AsyncPipe } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-chat-conversation-list',
  template: `
    Current interval: {{ source | async }}
    <app-chat-conversation-list-entry
      *ngFor="
        let conversation of chatStore.conversations$ | async;
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
  constructor(public chatStore: ChatStore) {}

  source = interval(1000);

  trackByConversationId(index: number, conversation: Conversation): string {
    return conversation.chatId;
  }
}
