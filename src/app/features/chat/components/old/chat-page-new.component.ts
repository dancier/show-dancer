// import {
//   ChangeDetectionStrategy,
//   Component,
//   inject,
//   OnInit,
//   Signal,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   ChatStateService,
//   SingleChatState,
// } from '../../page/chat-page-new/chat-state.service';
//
// @Component({
//   selector: 'app-chat-page-new',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <p>chat-page-new works!</p>
//     <p>{{ chats().length }}</p>
//     <div *ngFor="let chat of chats()">
//       <p>Name: {{ chat.participants[0].dancerName }}</p>
//       <p>Aus: {{ chat.participants[0].city }}</p>
//       <button (click)="service.selectChat$.next(chat.id)">Chat öffnen</button>
//       <div *ngFor="let message of chat.messages">
//         <p>{{ message.text }}</p>
//         <p>Von {{ message.authorId }}</p>
//       </div>
//     </div>
//   `,
//   changeDetection: ChangeDetectionStrategy.Default,
// })
// export class ChatPageNewComponent implements OnInit {
//   service = inject(ChatStateService);
//   chats: Signal<SingleChatState[]> = this.service.chats;
//
//   ngOnInit(): void {
//     // this.service.openChatWith$.next('123');
//   }
// }
