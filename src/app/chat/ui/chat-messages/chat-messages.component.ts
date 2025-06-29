import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ChatSingleMessageComponent } from './chat-single-message.component';
import { NgClass } from '@angular/common';
import { ChatMessage } from '../../data-access/chat.types';
import { ChatStateService } from '../../data-access/chat-state.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../../profile/data-access/types/profile.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  template: `
    <!--    <div class="relative">-->
    @if (ownUserId()) {
      <div class="flex h-[452px] flex-col-reverse overflow-auto p-8">
        <div class="flex flex-col gap-8">
          @for (message of activeChatMessages(); track message.id) {
            <app-chat-single-message
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
          }
          @if (activeChatMessages().length === 0) {
            <div
              class="self-center rounded border border-gray-300 px-8 py-4 text-center text-gray-500"
            >
              <p>Noch gibt es hier nichts zu sehen</p>
              <p class="mb-0">Schreibe jetzt deine erste Nachricht</p>
            </div>
          }
        </div>
      </div>
    }
    <!--    </div>-->
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatSingleMessageComponent, NgClass],
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
