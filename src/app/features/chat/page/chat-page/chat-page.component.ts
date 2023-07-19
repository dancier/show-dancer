import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ChatStore } from '../../common/services/chat.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, withLatestFrom } from 'rxjs';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { ChatMessageComposerComponent } from '../../components/chat-message-composer/chat-message-composer.component';
import { ChatMessagesComponent } from '../../components/chat-messages/chat-messages.component';
import { ChatConversationListComponent } from '../../components/chat-conversation-list/chat-conversation-list.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [provideComponentStore(ChatStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ChatPageComponent implements OnInit {
  // conversations!: ChatParticipant[];

  constructor(public chatStore: ChatStore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.chatStore.initialFetchCompleted$
      .pipe(
        filter((completed) => completed),
        withLatestFrom(this.route.params),
        filter(([_, params]) => !!params['participantId'])
      )
      .subscribe(([_, params]) => {
        this.chatStore.openConversation(params['participantId']);
      });
  }
}
