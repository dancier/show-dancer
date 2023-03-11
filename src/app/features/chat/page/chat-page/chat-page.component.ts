import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ChatMessage,
  ChatParticipant,
  DancerId,
} from '@features/chat/common/types/chat.types';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent {
  conversations: ChatParticipant[] = [
    {
      id: '1000',
      dancerName: 'LisaNeumann27',
      city: 'Dortmund',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
    {
      id: '1001',
      dancerName: 'HaraldSchmidt40',
      city: 'Berlin',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
    {
      id: '1002',
      dancerName: 'KlausKinski',
      city: 'Hamburg',
      profileImageHash:
        '9f067884b5a698109454ccc498a9506b049f7353c1023315ed5df30582aba91e',
    },
  ];

  selectedConversation: DancerId = '1000';

  selectedConversationMessages?: ChatMessage[] = [
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

  selectConversation(dancerId: DancerId): void {
    this.selectedConversation = dancerId;
  }

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
