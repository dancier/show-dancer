import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage, DancerId } from '../../common/types/chat.types';
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
})
export class ChatMessagesComponent {
  // addMessageForm: any;
  // error?: APIError;
  //
  // @Input() selectedChat?: Chat;
  @Input()
  participant: DancerId = '1';

  @Input() messages?: ChatMessage[] = [
    {
      text: 'Hallo, wie gehts?',
      authorId: '1',
      id: '1',
      readByDancers: [],
      createdAt: '2021-01-01T00:45:48.000Z',
    },
    {
      text: 'Gut, danke der Nachfrage. Ich habe heute schon viel geschafft. Da waren einige Projekte, die ich erledigen musste. Puh, war das viel arbeit. Und du?',
      authorId: '2',
      id: '2',
      readByDancers: [],
      createdAt: '2021-01-01T01:13:29.000Z',
    },
    {
      text: 'Naja, ich muss dir sagen, bei mir läuft es schlecht. Leider hab ich mich von meiner Freundin getrennt :(',
      authorId: '1',
      id: '3',
      readByDancers: [],
      createdAt: '2021-01-01T01:16:32.000Z',
    },
  ];
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
