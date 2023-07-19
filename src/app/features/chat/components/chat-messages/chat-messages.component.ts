import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatStore } from '../../common/services/chat.store';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
// import { NonNullableFormBuilder, Validators } from '@angular/forms';
// import { ChatService } from '@features/chat/common/services/chat.service';
// import {
//   Chat,
//   MessagesByChatMap,
// } from '@features/chat/common/types/chat.types';
// import { APIError } from '@shared/http/response.types';

@Component({
    selector: 'app-chat-messages',
    templateUrl: './chat-messages.component.html',
    styleUrls: ['./chat-messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        ChatMessageComponent,
        NgClass,
        AsyncPipe,
    ],
})
export class ChatMessagesComponent {
  // TODO: logic to differentiate between own messages and partner messages
  ownUserId = this.chatStore.ownProfileId$;

  messages = this.chatStore.selectedConversationMessages$;

  constructor(public chatStore: ChatStore) {}

  // addMessageForm: any;
  // error?: APIError;
  //
  // @Input() selectedChat?: Chat;
  // @Input()
  // participant: DancerId = '1';

  // @Input() messages?: ChatMessage[] = [
  // ];
  //
  // constructor(
  //   private fb: NonNullableFormBuilder,
  //   public chatService: ChatService
  // ) {}
  //
  // ngOnInit(): void {
  //   this.addMessageForm = this.fb.group({
  //     text: ['', [Validators.required]],
  //   });
  // }
  //
  // submitForm(): void {
  //   if (this.addMessageForm.valid && this.addMessageForm.value.text) {
  //     const text = this.addMessageForm.value.text;
  //     this.chatService.createAndFetchMessages$(text).subscribe((response) => {
  //       if (response.isSuccess) {
  //         this.addMessageForm.setValue({ text: '' });
  //       } else {
  //         this.error = response.error;
  //       }
  //     });
  //   }
  // }
}
