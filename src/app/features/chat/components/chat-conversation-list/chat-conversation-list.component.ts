import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ChatParticipant, DancerId } from '../../common/types/chat.types';

@Component({
  selector: 'app-chat-conversations-list',
  templateUrl: './chat-conversation-list.component.html',
  styleUrls: ['./chat-conversation-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationListComponent {
  @Input()
  conversations: ChatParticipant[] = [
    {
      id: '1000',
      dancerName: 'LisaNeumann27',
      city: 'Dortmund',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
    {
      id: '1001',
      dancerName: 'HaraldSchmidt40',
      city: 'Berlin',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
    {
      id: '1002',
      dancerName: 'KlausKinski',
      city: 'Hamburg',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
  ];

  @Input()
  selectedConversation: DancerId = '1000';

  @Output()
  conversationSelected = new EventEmitter<DancerId>();

  selectConversation(conversationId: DancerId): void {
    this.conversationSelected.emit(conversationId);
  }
}
