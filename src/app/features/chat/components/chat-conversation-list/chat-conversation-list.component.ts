import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatStore } from '../../common/services/chat.store';
import { Conversation } from '../../common/types/chat.types';
import { ChatConversationListEntryComponent } from './chat-conversation-list-entry/chat-conversation-list-entry.component';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-chat-conversation-list',
    templateUrl: './chat-conversation-list.component.html',
    styleUrls: ['./chat-conversation-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
    host: { role: 'list' },
    standalone: true,
    imports: [
        NgFor,
        ChatConversationListEntryComponent,
        AsyncPipe,
    ],
})
export class ChatConversationListComponent {
  constructor(public chatStore: ChatStore) {}

  trackByConversationId(index: number, conversation: Conversation): string {
    return conversation.chatId;
  }
}
