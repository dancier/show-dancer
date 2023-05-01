import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '@core/common/environment.service';
import {
  Conversation,
  ChatDto,
  DancerMapDto,
  MessageResponse,
  ChatMessage,
} from '../types/chat.types';
import { combineLatest, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '@core/profile/profile.service';

type FetchChatsDto = {
  chats: ChatDto[];
};

export type CreateChatResponse = {
  chatId: string;
  dancerIds: string[];
  lastActivity: null;
  type: 'DIRECT';
  lastMessage: null;
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private refresherIntervalMessagesId?: number;
  // private refresherIntervalChatsId?: number;
  // private _chats = new BehaviorSubject<Chat[]>([]);
  // private _dancers = new BehaviorSubject<DancerMap>({});
  // private _messagesByChat = new BehaviorSubject<MessagesByChatMap>({});
  // public readonly chats$: Observable<Chat[]> = this._chats
  //   .asObservable()
  //   .pipe(filter(isNonNull));
  // public readonly dancers$: Observable<DancerMap> = this._dancers
  //   .asObservable()
  //   .pipe(filter(isNonNull));
  // public readonly messagesByChat$: Observable<MessagesByChatMap> =
  //   this._messagesByChat.asObservable().pipe(filter(isNonNull));
  // public selectedChatId: string | null = null;

  private defaultOptions = {
    withCredentials: true,
  };
  private readonly chatApiUrl: string;
  private readonly dancerApiUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService,
    private authStorageService: AuthStorageService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.chatApiUrl = `${this.environment.getApiUrl()}/chats`;
    this.dancerApiUrl = `${this.environment.getApiUrl()}/dancers`;
    // fetch chat data once the user is logged in
    // this.authStorageService.authData$.subscribe((response) => {
    //   if (response.isLoggedIn) {
    //     this.pollForChats();
    //   } else {
    //     this.stopPollingForChats();
    //   }
    // });
  }

  getConversations$(): Observable<Conversation[]> {
    const chats$ = this.fetchAllChats$();
    const dancersInfo$ = this.fetchDancersInfo$(chats$);
    return combineLatest([chats$, dancersInfo$]).pipe(
      map(([chats, dancersInfo]) => {
        return chats.map((chat) => ({
          chatId: chat.chatId,
          participants: chat.dancerIds.map((dancerId) => ({
            ...dancersInfo[dancerId],
          })),
        }));
      })
    );
  }

  // const conversations = combineLatest([ fetchDancersByIds$, getDancersInfo$(fetchDancersByIds$) ]).pipe(

  fetchDancersInfo$(chats: Observable<ChatDto[]>): Observable<DancerMapDto> {
    return chats.pipe(
      switchMap((chats) => {
        const dancerIds = chats.flatMap((chat) => chat.dancerIds);
        return this.fetchDancersByIds$(dancerIds);
      })
    );
  }

  fetchDancersByIds$(dancerIds: string[]): Observable<DancerMapDto> {
    const requestBody = {
      dancerIds,
    };
    return this.http
      .post<DancerMapDto>(`${this.dancerApiUrl}`, requestBody, {
        ...this.defaultOptions,
      })
      .pipe(shareReplay(1));
  }

  // TODO: error handling
  fetchAllChats$(): Observable<ChatDto[]> {
    return this.http
      .get<FetchChatsDto>(this.chatApiUrl, this.defaultOptions)
      .pipe(
        map((response) => {
          return response.chats;
        }),
        shareReplay(1)
      );
  }

  // TODO: error handling
  fetchMessagesForChat(chatId: string): Observable<ChatMessage[]> {
    return this.http
      .get<MessageResponse>(
        `${this.chatApiUrl}/${chatId}/messages`,
        this.defaultOptions
      )
      .pipe(
        map((response) => {
          return response.messages;
        }),
        shareReplay(1)
      );
  }

  sendMessage$(chatId: string, message: string): Observable<void> {
    return this.http.post<void>(
      `${this.chatApiUrl}/${chatId}/messages`,
      { text: message },
      this.defaultOptions
    );
  }

  // //
  // // TODO: use interval instead of setTimeout
  // // https://www.learnrxjs.io/learn-rxjs/operators/creation/interval
  //
  // createAndFetchMessages$(text: string): Observable<APIResponse<void>> {
  //   return this.chatHttpService
  //     .createMessage$(this.selectedChatId!, { text })
  //     .pipe(
  //       tap(() =>
  //         this.chatHttpService
  //           .getMessages$(this.selectedChatId!, this.getLastMessageId())
  //           .subscribe((response) => {
  //             if (response.isSuccess) {
  //               this.addMessagesToChat(response.payload, this.selectedChatId!);
  //             }
  //           })
  //       )
  //     );
  // }
  //
  // private fetchChatsAndDancers(): void {
  //   this.chatHttpService.getChatsAndDancers$().subscribe((response) => {
  //     if (response.isSuccess) {
  //       this._chats.next(response.payload.chatList);
  //       this._dancers.next(response.payload.dancerMap);
  //     }
  //   });
  // }
  //
  // fetchNewMessages(): void {
  //   const lastMessageId = this.getLastMessageId();
  //
  //   this.chatHttpService
  //     .getMessages$(this.selectedChatId!, lastMessageId)
  //     .subscribe((response) => {
  //       if (response.isSuccess) {
  //         this.addMessagesToChat(response.payload, this.selectedChatId!);
  //       }
  //     });
  // }
  //
  // getLastMessageId(): string | undefined {
  //   const chatId = this.selectedChatId!;
  //   const lastMessage = (this._messagesByChat.value[chatId] || []).slice(-1)[0];
  //   return lastMessage?.id;
  // }
  //
  // pollForNewMessages(): void {
  //   clearInterval(this.refresherIntervalMessagesId);
  //   this.fetchNewMessages();
  //   this.refresherIntervalMessagesId = window.setInterval(
  //     () => this.fetchNewMessages(),
  //     1000
  //   );
  // }
  //
  // stopPollingForMessages(): void {
  //   clearInterval(this.refresherIntervalMessagesId);
  // }
  //
  // pollForChats(): void {
  //   clearInterval(this.refresherIntervalChatsId);
  //   this.fetchChatsAndDancers();
  //   this.refresherIntervalChatsId = window.setInterval(
  //     () => this.fetchChatsAndDancers(),
  //     10000
  //   );
  // }
  //
  // stopPollingForChats(): void {
  //   clearInterval(this.refresherIntervalChatsId);
  // }
  //
  // addMessagesToChat(messageResponse: MessageResponse, chatId: string): void {
  //   if (messageResponse.messages.length === 0) {
  //     return;
  //   }
  //   const existingMessagesForChat =
  //     this.getExistingMessagesForChat(chatId) || [];
  //   const allMessagesForChat = this.distinctAndSortedMessages(
  //     existingMessagesForChat.concat(messageResponse.messages)
  //   );
  //   const updatedMessagesForAllChats = { ...this._messagesByChat.value };
  //   updatedMessagesForAllChats[chatId] = allMessagesForChat;
  //   this._messagesByChat.next(updatedMessagesForAllChats);
  // }
  //
  // private getExistingMessagesForChat(chatId: string): ChatMessage[] {
  //   return this._messagesByChat.value[chatId];
  // }
  //
  // setSelectedChatId(chatId: string): void {
  //   this.selectedChatId = chatId;
  // }
  //
  // private distinctAndSortedMessages(messages: ChatMessage[]): ChatMessage[] {
  //   if (!messages) {
  //     return [];
  //   }
  //   const result = [];
  //   const mapOfMessageIds = new Map();
  //   for (const message of messages) {
  //     if (!mapOfMessageIds.has(message.id)) {
  //       mapOfMessageIds.set(message.id, true); // set any value to Map
  //       result.push(message);
  //     }
  //   }
  //   return result.sort(
  //     (a, b) =>
  //       Date.parse(a.createdAt).valueOf() - Date.parse(b.createdAt).valueOf()
  //   );
  // }

  // TODO: should this service handle routing? Is there a better solution?
  openChatWith(id: string): void {
    this.router.navigate(['chat', id]);
  }

  createChat$(participantId: string): Observable<CreateChatResponse> {
    const body = {
      dancerIds: [this.profileService.getProfile()?.id, participantId],
    };

    return this.http.post<CreateChatResponse>(
      `${this.chatApiUrl}`,
      body,
      this.defaultOptions
    );
  }
}
