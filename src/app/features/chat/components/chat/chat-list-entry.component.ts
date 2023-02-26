import { Component, Input, OnInit } from '@angular/core';
import { Chat, DancerMap } from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat-list-entry',
  templateUrl: './chat-list-entry.component.html',
  styleUrls: ['./chat-list-entry.component.scss'],
})
export class ChatListEntryComponent implements OnInit {
  @Input() chat?: Chat;
  @Input() currentUser?: string;
  @Input() dancers?: DancerMap;

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
