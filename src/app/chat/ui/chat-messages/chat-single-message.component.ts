import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage } from '../../data-access/chat.types';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-single-message',
  template: `
    <div
      *ngIf="message"
      class="relative rounded-3xl px-6 py-3 drop-shadow"
      [ngClass]="{
        'rounded-br-none bg-green-50': isOwnMessage,
        'rounded-bl-none bg-white': !isOwnMessage
      }"
    >
      <div>{{ message.text }}</div>
      <div
        class="absolute bottom-0.5"
        [ngClass]="{
          'fill-green-500': !isOwnMessage || isRead,
          'fill-gray-500': isOwnMessage && !isRead,
          'left-1.5': !isOwnMessage,
          'right-1.5': isOwnMessage
        }"
      >
        <svg class="h-4 w-4">
          <use
            [attr.href]="
              'assets/icons/bootstrap-icons.svg#' +
              (!isOwnMessage || isRead ? 'check2-all' : 'check2')
            "
          />
        </svg>
      </div>
    </div>
    <div class="pt-1 text-right text-xs text-gray-500">
      {{ message.createdAt | date : 'short' }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgClass, DatePipe],
})
export class ChatSingleMessageComponent {
  @Input({ required: true })
  message!: ChatMessage;

  @Input({ required: true })
  isOwnMessage = false;

  @Input({ required: true })
  isRead = false;
}
