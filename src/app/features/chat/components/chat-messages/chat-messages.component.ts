import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ChatService } from '@features/chat/common/services/chat.service';
import {
  Chat,
  MessagesByChatMap,
} from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
  addMessageForm: any;

  @Input() selectedChat?: Chat;
  @Input() messagesByChat?: MessagesByChatMap;

  constructor(
    private fb: NonNullableFormBuilder,
    public chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.addMessageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.addMessageForm.valid && this.addMessageForm.value.text) {
      const text = this.addMessageForm.value.text;
      this.chatService.createAndFetchMessages$(text).subscribe(response => {
        if (response.isSuccess) {
          this.addMessageForm.setValue({text: ''})
        }
      });
    }
  }
}
