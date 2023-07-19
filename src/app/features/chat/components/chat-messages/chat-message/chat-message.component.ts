import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage } from '../../../common/types/chat.types';
import { NgIf, NgClass } from '@angular/common';

@Component({
    selector: 'app-chat-message',
    templateUrl: './chat-message.component.html',
    styleUrls: ['./chat-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, NgClass],
})
export class ChatMessageComponent {
  @Input()
  message?: ChatMessage;

  @Input()
  isOwnMessage = false;
}
