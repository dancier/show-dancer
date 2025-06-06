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
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../../profile/data-access/types/profile.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  template: `
    <!--    <div class="relative">-->
    <div
      *ngIf="ownUserId()"
      class="flex h-[452px] flex-col-reverse overflow-auto p-8"
    >
      <div class="flex flex-col gap-8">
        <app-chat-single-message
          *ngFor="let message of activeChatMessages()"
          class="max-w-[80%]"
          [message]="message"
          [isOwnMessage]="message.authorId === ownUserId()"
          [isRead]="
            message.readByParticipants
              ? message.readByParticipants.length > 1
              : false
          "
          [ngClass]="{
            'self-start': message.authorId !== ownUserId(),
            'self-end': message.authorId === ownUserId()
          }"
        ></app-chat-single-message>
        <div
          *ngIf="activeChatMessages().length === 0"
          class="self-center rounded border border-gray-300 px-8 py-4 text-center text-gray-500"
        >
          <p>Noch gibt es hier nichts zu sehen</p>
          <p class="mb-0">Schreibe jetzt deine erste Nachricht</p>
        </div>
      </div>
    </div>
    <!--    </div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    inject(OwnProfileService).profile$.pipe(
      startWith({
        id: 'dancerId1',
      } as Profile),
      map((profile) => profile.id)
    )
  );

  activeChatMessages: Signal<ChatMessage[]> =
    this.chatState.messagesForActiveChat;
}
