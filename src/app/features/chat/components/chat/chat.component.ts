import { Component, Input, OnInit } from '@angular/core';
import { Chat, DancerMap } from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() chat?: Chat;
  @Input() currentUser?: string;
  @Input() dancers?: DancerMap;

  title?: string;

  constructor() {}

  ngOnInit(): void {
    const partnerId = this.chat?.dancerIds.find((id) => id !== this.currentUser);
    if (partnerId === undefined) {
      this.title = 'Unbekannt';
    } else {
      const partner = this.dancers && this.dancers[partnerId];
      this.title = `${partner?.dancerName}, ${partner?.city}`;
    }
  }
}
