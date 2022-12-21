import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { BehaviorSubject, filter, Observable, tap } from 'rxjs';
import { isNonNull } from '@core/common/rxjs.utils';
import { ChatHttpService } from './chat-http.service';
import {
  Chat,
  ChatMessage,
  DancerMap,
  MessageResponse,
  MessagesByChatMap,
} from '../types/chat.types';
import { APIResponse } from '@shared/http/response.types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private refresherIntervalMessagesId?: number;
  private refresherIntervalChatsId?: number;
  private _chats = new BehaviorSubject<Chat[]>([]);
  private _dancers = new BehaviorSubject<DancerMap>({});
  private _messagesByChat = new BehaviorSubject<MessagesByChatMap>({});
  public readonly chats$: Observable<Chat[]> = this._chats
    .asObservable()
    .pipe(filter(isNonNull));
  public readonly dancers$: Observable<DancerMap> = this._dancers
    .asObservable()
    .pipe(filter(isNonNull));
  public readonly messagesByChat$: Observable<MessagesByChatMap> =
    this._messagesByChat.asObservable().pipe(filter(isNonNull));
  public selectedChatId: string | null = null;

  constructor(
    private chatHttpService: ChatHttpService,
    private authStorageService: AuthStorageService
  ) {
    // fetch chat data once the user is logged in
    this.authStorageService.authData$.subscribe((response) => {
      if (response.isLoggedIn) {
        this.pollForChats();
      } else {
        this.stopPollingForChats();
      }
    });
  }

  createAndFetchMessages$(text: string): Observable<APIResponse<void>> {
    return this.chatHttpService
      .createMessage$(this.selectedChatId!, { text })
      .pipe(
        tap(() =>
          this.chatHttpService
            .getMessages$(this.selectedChatId!, this.getLastMessageId())
            .subscribe((response) => {
              if (response.isSuccess) {
                this.addMessagesToChat(response.payload, this.selectedChatId!);
              }
            })
        )
      );
  }

  fetchChatsAndDancers(): void {
    this.chatHttpService.getChatsAndDancers$().subscribe((response) => {
      if (response.isSuccess) {
        this._chats.next(response.payload.chatList);
        this._dancers.next(response.payload.dancerMap);
      }
    });
  }

  fetchNewMessages(): void {
    const lastMessageId = this.getLastMessageId();

    this.chatHttpService
      .getMessages$(this.selectedChatId!, lastMessageId)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.addMessagesToChat(response.payload, this.selectedChatId!);
        }
      });
  }

  getLastMessageId(): string | undefined {
    const chatId = this.selectedChatId!;
    const lastMessage = (this._messagesByChat.value[chatId] || []).slice(-1)[0];
    return lastMessage?.id;
  }

  pollForNewMessages(): void {
    clearInterval(this.refresherIntervalMessagesId);
    this.fetchNewMessages();
    this.refresherIntervalMessagesId = window.setInterval(
      () => this.fetchNewMessages(),
      1000
    );
  }

  stopPollingForMessages(): void {
    clearInterval(this.refresherIntervalMessagesId);
  }

  pollForChats(): void {
    clearInterval(this.refresherIntervalChatsId);
    this.fetchChatsAndDancers();
    this.refresherIntervalChatsId = window.setInterval(
      () => this.fetchChatsAndDancers(),
      10000
    );
  }

  stopPollingForChats(): void {
    clearInterval(this.refresherIntervalChatsId);
  }

  addMessagesToChat(messageResponse: MessageResponse, chatId: string): void {
    if (messageResponse.messages.length === 0) {
      return;
    }
    let existingMessagesForChat = this.getExistingMessagesForChat(chatId) || [];
    let allMessagesForChat = this.distinctAndSortedMessages(
      existingMessagesForChat.concat(messageResponse.messages)
    );
    let updatedMessagesForAllChats = { ...this._messagesByChat.value };
    updatedMessagesForAllChats[chatId] = allMessagesForChat;
    this._messagesByChat.next(updatedMessagesForAllChats);
  }

  getExistingMessagesForChat(chatId: string): ChatMessage[] {
    return this._messagesByChat.value[chatId];
  }

  setSelectedChatId(chatId: string): void {
    this.selectedChatId = chatId;
  }

  distinctAndSortedMessages(messages: ChatMessage[]): ChatMessage[] {
    if (!messages) {
      return [];
    }
    const result = [];
    const map = new Map();
    for (const message of messages) {
      if (!map.has(message.id)) {
        map.set(message.id, true); // set any value to Map
        result.push(message);
      }
    }
    return result.sort(
      (a, b) =>
        Date.parse(a.createdAt).valueOf() - Date.parse(b.createdAt).valueOf()
    );
  }
}
