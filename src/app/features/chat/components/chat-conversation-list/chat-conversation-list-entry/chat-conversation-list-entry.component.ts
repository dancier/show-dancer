import { Component, Input } from '@angular/core';
import { ChatParticipant } from '../../../common/types/chat.types';
import { ImageService } from '@core/image/image.service';

@Component({
  selector: 'app-chat-conversation-list-entry',
  templateUrl: './chat-conversation-list-entry.component.html',
  styleUrls: ['./chat-conversation-list-entry.component.scss'],
})
export class ChatConversationListEntryComponent {
  @Input()
  participant?: ChatParticipant = {
    id: '1234',
    dancerName: 'LisaNeumann27',
    city: 'Dortmund',
    profileImageHash:
      '8ef67ce87eab27c8efc600103670594631c0652e88ac48257efad0d1b876daea',
  };

  @Input()
  isSelected = false;

  constructor(public imageService: ImageService) {}

  // inputs
  // - chat partner id
  // - image hash / url
}
