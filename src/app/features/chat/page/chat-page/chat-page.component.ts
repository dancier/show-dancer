import { Component, OnInit } from '@angular/core';
import { ChatService } from '@features/chat/common/services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  constructor(
    public chatService: ChatService
  ) { }


}
