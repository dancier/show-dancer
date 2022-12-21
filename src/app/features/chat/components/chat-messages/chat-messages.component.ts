import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Chat, MessagesByChatMap } from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss']
})
export class ChatMessagesComponent implements OnInit {
  addMessageForm: any;

  @Input() selectedChat?: Chat;
  @Input() messagesByChat?: MessagesByChatMap;
  @Output() messageCreated = new EventEmitter<string>();

  constructor(
    private fb: NonNullableFormBuilder,
  ) { }

  ngOnInit(): void {
    this.addMessageForm = this.fb.group({
      text: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.addMessageForm.valid && this.addMessageForm.value.text) {
      const text = this.addMessageForm.value.text;
      this.messageCreated.emit(text);
    }
  }

}
