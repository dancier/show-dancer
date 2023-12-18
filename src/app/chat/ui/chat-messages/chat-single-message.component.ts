import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage } from '../../data-access/chat.types';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-single-message',
  template: `
    <div
      *ngIf="message"
      class="rounded-3xl px-6 py-3 drop-shadow"
      [ngClass]="{
        'rounded-br-none bg-green-100': isOwnMessage,
        'rounded-bl-none bg-white': !isOwnMessage
      }"
    >
      {{ message.text }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgClass],
})
export class ChatSingleMessageComponent {
  @Input()
  message?: ChatMessage;

  @Input()
  isOwnMessage = false;
}
