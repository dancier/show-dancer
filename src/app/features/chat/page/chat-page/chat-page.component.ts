import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '@features/chat/common/services/chat.service';
import { ChatData } from '@features/chat/common/types/chat.types';
import { ProfileService } from '@features/profile/common/services/profile.service';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnDestroy, OnInit {
  chatData$!: Observable<ChatData>;

  constructor(
    public chatService: ChatService,
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.chatData$ = combineLatest([
      this.chatService.chats$,
      this.chatService.dancers$,
      this.profileService.profile$,
    ]).pipe(map(([chats, dancers, profile]) => ({ chats, dancers, profile })));
  }

  ngOnDestroy(): void {
    this.chatService.stopPollingForMessages();
  }

  selectChat(chatId: string): void {
    this.chatService.setSelectedChatId(chatId);
    this.chatService.pollForNewMessages();
  }
}
