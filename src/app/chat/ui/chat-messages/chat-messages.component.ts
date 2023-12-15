import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ChatSingleMessageComponent } from './chat-single-message.component';
import { AsyncPipe, JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChatMessage } from '../../data-access/chat.types';
import { ChatStateService } from '../../data-access/chat-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileService } from '@shared/data-access/profile/profile.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../../profile/data-access/types/profile.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  template: `
    <div
      *ngIf="ownUserId()"
      class="flex h-[500px] flex-col-reverse overflow-auto p-10"
    >
      <!--      Messages: {{ messagesIterative | json }}-->
      <div class="flex flex-col gap-8">
        <app-chat-single-message
          *ngFor="let message of activeChatMessages()"
          class="max-w-[80%]"
          [message]="message"
          [isOwnMessage]="message.authorId === ownUserId()"
          [ngClass]="{
            'self-start': message.authorId !== ownUserId(),
            'self-end': message.authorId === ownUserId()
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
  chatState = inject(ChatStateService);
  ownUserId: Signal<string | undefined> = toSignal(
    inject(ProfileService).profile$.pipe(
      startWith({
        id: 'dancerId1',
      } as Profile),
      map((profile) => profile.id)
    )
  );

  activeChatMessages: Signal<ChatMessage[]> =
    this.chatState.messagesForActiveChat;

  // TODO: logic to differentiate between own messages and partner messages
  // ownUserId = this.chatStore.ownProfileId$;
  //
  // messages = this.chatStore.selectedConversationMessages$;
  //
  // messagesIterative: ChatMessage[] = [];
  //
  // constructor(public chatStore: ChatStore) {
  //   this.messages.subscribe((messages) => {
  //     console.log('new messages arrived', messages);
  //     this.messagesIterative = messages;
  //   });
  // }
}