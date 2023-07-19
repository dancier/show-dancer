import { Component, Input, OnInit } from '@angular/core';
import { ChatDto, DancerMapDto } from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat-list-entry',
  templateUrl: './chat-list-entry.component.html',
  styleUrls: ['./chat-list-entry.component.scss'],
  standalone: true,
})
export class ChatListEntryComponent implements OnInit {
  @Input() chat?: ChatDto;
  @Input() currentUser?: string;
  @Input() dancers?: DancerMapDto;

  title?: string;

  constructor() {}

  ngOnInit(): void {
    const partnerId = this.chat?.dancerIds.find(
      (id) => id !== this.currentUser
    );
    if (partnerId === undefined) {
      this.title = 'Unbekannt';
    } else {
      const partner = this.dancers && this.dancers[partnerId];
      this.title = `${partner?.dancerName}, ${partner?.city}`;
    }
  }
}
