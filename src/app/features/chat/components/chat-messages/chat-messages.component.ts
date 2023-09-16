import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatStore } from '../../common/services/chat.store';
import { ChatSingleMessageComponent } from './chat-single-message.component';
import { NgIf, NgFor, NgClass, AsyncPipe, JsonPipe } from '@angular/common';
import { ChatMessage } from '../../common/types/chat.types';

@Component({
  selector: 'app-chat-messages',
  template: `
    <div
      *ngIf="{
        messages: this.messages | async,
        ownUserId: this.ownUserId | async
      } as vm"
      class="flex h-[500px] flex-col-reverse overflow-auto p-10"
    >
      Messages: {{ messagesIterative | json }}
      <div class="flex flex-col gap-8">
        <app-chat-single-message
          *ngFor="let message of vm.messages"
          class="max-w-[80%]"
          [message]="message"
          [isOwnMessage]="message.authorId === vm.ownUserId"
          [ngClass]="{
            'self-start': message.authorId !== vm.ownUserId,
            'self-end': message.authorId === vm.ownUserId
          }"
        ></app-chat-single-message>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ChatSingleMessageComponent,
    NgClass,
    AsyncPipe,
    JsonPipe,
  ],
})
export class ChatMessagesComponent {
  // TODO: logic to differentiate between own messages and partner messages
  ownUserId = this.chatStore.ownProfileId$;

  messages = this.chatStore.selectedConversationMessages$;

  messagesIterative: ChatMessage[] = [];

  constructor(public chatStore: ChatStore) {
    this.messages.subscribe((messages) => {
      console.log('new messages arrived', messages);
      this.messagesIterative = messages;
    });
  }
}
