import { Component, OnInit } from '@angular/core';
import { ChatService } from '@features/chat/common/services/chat.service';
import { DancerId } from '@features/chat/common/types/chat.types';
import { ProfileService } from '@features/profile/common/services/profile.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit {

  currentUser?: DancerId;

  constructor(
    public chatService: ChatService,
    public profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.profileService.getProfile()?.id
  }

  selectChat(chatId: string): void {
    this.chatService.changeCurrentChat(chatId);
  }

}
