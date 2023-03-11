import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage } from '../../../common/types/chat.types';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  @Input()
  message?: ChatMessage;

  @Input()
  isOwnMessage = false;
}
