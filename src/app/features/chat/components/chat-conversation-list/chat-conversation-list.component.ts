import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChatParticipant, DancerId } from '../../common/types/chat.types';

@Component({
  selector: 'app-chat-conversation-list',
  templateUrl: './chat-conversation-list.component.html',
  styleUrls: ['./chat-conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationListComponent {
  @Input()
  conversations?: ChatParticipant[];

  @Input()
  selectedConversation: DancerId = '1000';

  @Output()
  conversationSelected = new EventEmitter<DancerId>();

  selectConversation(conversationId: DancerId): void {
    this.conversationSelected.emit(conversationId);
  }
}
