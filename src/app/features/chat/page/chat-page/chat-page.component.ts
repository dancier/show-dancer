import { Component, OnDestroy, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@features/chat/common/services/chat.service';
import { DancerId } from '@features/chat/common/types/chat.types';
import { ProfileService } from '@features/profile/common/services/profile.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnDestroy {

  constructor(
    public chatService: ChatService,
    public profileService: ProfileService
  ) {}

  ngOnDestroy(): void {
    this.chatService.stopPollingForMessages();
  }

  selectChat(chatId: string): void {
    this.chatService.changeCurrentChat(chatId);
    this.chatService.pollForNewMessages();
  }

}
