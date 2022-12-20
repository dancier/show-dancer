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
export class ChatPageComponent implements OnInit, OnDestroy {
  currentUser?: DancerId;
  addMessageForm: any;

  constructor(
    private fb: NonNullableFormBuilder,
    public chatService: ChatService,
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.addMessageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
    this.currentUser = this.profileService.getProfile()?.id;
  }

  ngOnDestroy(): void {
    this.chatService.stopPollingForMessages();
  }

  selectChat(chatId: string): void {
    this.chatService.changeCurrentChat(chatId);
    this.chatService.pollForNewMessages();
  }

  submitForm(): void {
    if (this.addMessageForm.valid && this.addMessageForm.value.text) {
      const text = this.addMessageForm.value.text;
      this.chatService.createAndFetchMessages(text);
    }
  }
}
