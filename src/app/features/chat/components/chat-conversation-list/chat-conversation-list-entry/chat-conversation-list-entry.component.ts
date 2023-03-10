import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChatParticipant } from '../../../common/types/chat.types';
import { ImageService } from '@core/image/image.service';

@Component({
  selector: 'app-chat-conversation-list-entry',
  templateUrl: './chat-conversation-list-entry.component.html',
  styleUrls: ['./chat-conversation-list-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationListEntryComponent {
  @Input()
  participant?: ChatParticipant;

  @Input()
  isSelected = false;

  @Output()
  conversationSelected = new EventEmitter<void>();

  constructor(public imageService: ImageService) {}

  selectConversation(): void {
    this.conversationSelected.emit();
  }
}
