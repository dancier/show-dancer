import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlertComponent } from '@shared/common/components/alert/alert.component';
import { ChatMessageComposerComponent } from '../../components/message-composer/chat-message-composer.component';
import { ChatMessagesComponent } from '../../components/chat-messages/chat-messages.component';
import { ChatConversationListComponent } from '../../components/conversation-list/chat-conversation-list.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { ChatStateSignalsService } from '../../common/services/chat-state-signals.service';

@Component({
  selector: 'app-chat-page',
  // templateUrl: './chat-page.component.html',
  template: `
    Num: {{ service.conversations() }}
    <ul>
      <li
        *ngFor="let conversation of service.conversations()"
        data-testid="chat-list-entry"
      >
        {{ conversation.participants[0].dancerName }}
      </li>
    </ul>
  `,
  styleUrls: ['./chat-page.component.scss'],
  providers: [],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    NgIf,
    ChatConversationListComponent,
    ChatMessagesComponent,
    ChatMessageComposerComponent,
    RouterLink,
    AlertComponent,
    NgFor,
    AsyncPipe,
  ],
})
export class ChatPageComponent {
  numOfConversations = 0;

  constructor(
    public service: ChatStateSignalsService,
    private route: ActivatedRoute
  ) {}
}
