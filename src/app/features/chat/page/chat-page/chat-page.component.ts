import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessage,
  ChatParticipant,
  DancerId,
} from '@features/chat/common/types/chat.types';
import { ChatStore } from '../../common/services/chat.store';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [ChatStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
  conversations!: ChatParticipant[];

  selectedConversation!: DancerId;

  selectedConversationMessages?: ChatMessage[];

  selectConversation(dancerId: DancerId): void {
    this.selectedConversation = dancerId;
  }

  constructor(private chatStore: ChatStore) {}

  // chatData$!: Observable<ChatData>;
  //
  // constructor(
  //   public chatService: ChatService,
  //   public profileService: ProfileService
  // ) {}
  // ngOnInit(): void {
  //   this.chatData$ = combineLatest([
  //     this.chatService.chats$,
  //     this.chatService.dancers$,
  //     this.profileService.profile$,
  //   ]).pipe(map(([chats, dancers, profile]) => ({ chats, dancers, profile })));
  // }
  //
  // ngOnDestroy(): void {
  //   this.chatService.stopPollingForMessages();
  // }
  //
  // selectChat(chatId: string): void {
  //   this.chatService.setSelectedChatId(chatId);
  //   this.chatService.pollForNewMessages();
  // }
}
