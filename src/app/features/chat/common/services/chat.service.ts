import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { isNonNull } from '@core/common/rxjs.utils';
import { ChatHttpService } from './chat-http.service';
import {
  Chat,
  ChatMessage,
  DancerMap,
  MessageResponse,
  MessagesByChatMap,
} from '../types/chat.types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chats = new BehaviorSubject<Chat[] | null>(null);
  private _dancers = new BehaviorSubject<DancerMap | null>(null);
  private _messagesByChat = new BehaviorSubject<MessagesByChatMap | null>(null);
  public readonly chats$: Observable<Chat[]> = this._chats
    .asObservable()
    .pipe(filter(isNonNull));
  public readonly dancers$: Observable<DancerMap> = this._dancers
    .asObservable()
    .pipe(filter(isNonNull));
  public readonly messagesByChat$: Observable<MessagesByChatMap> =
    this._messagesByChat.asObservable().pipe(filter(isNonNull));
  public selectedChat: Chat | null = null;

  constructor(
    private chatHttpService: ChatHttpService,
    private authStorageService: AuthStorageService
  ) {
    // fetch chat data once the user is logged in
    this.authStorageService.authData$.subscribe((response) => {
      if (response.isLoggedIn) {
        this.fetchChatsAndDancers();
      }
    });
  }

  fetchChatsAndDancers(): void {
    this.chatHttpService.getChatsAndDancers$().subscribe((response) => {
      if (response.isSuccess) {
        this._chats.next(response.payload.chatList);
        this._dancers.next(response.payload.dancerMap);
      }
    });
  }

  fetchNewMessages(chatId: string): void {
    let lastMessageId = this.selectedChat?.lastMessage.id;

    this.chatHttpService
      .getMessages(chatId, lastMessageId)
      .subscribe((response) => {
        if (response.isSuccess) {
          this.addMessagesToChat(response.payload, chatId);
        }
      });
  }

  addMessagesToChat(messageResponse: MessageResponse, chatId: string): void {
    let existingMessagesForChat = this.getExistingMessagesForChat(chatId);
    let allMessagesForChat = existingMessagesForChat
      .concat(messageResponse.messages)
      .sort(
        (a, b) =>
          Date.parse(a.createdAt).valueOf() - Date.parse(b.createdAt).valueOf()
      );
    let updatedMessagesForAllChats = { ...this._messagesByChat.value };
    updatedMessagesForAllChats[chatId] = allMessagesForChat;
    this._messagesByChat.next(updatedMessagesForAllChats);
  }

  getExistingMessagesForChat(chatId: string): ChatMessage[] {
    if (this._messagesByChat === null || this._messagesByChat.value === null) {
      return [];
    }
    return this._messagesByChat.value[chatId];
  }

  setSelectedChat(chatId: string): void {
    this.selectedChat =
      this._chats.value !== null
        ? this._chats.value.find((chat) => chat.chatId === chatId) || null
        : null;
  }

  changeCurrentChat(chatId: string): void {
    this.setSelectedChat(chatId);
    this.fetchNewMessages(chatId);
  }
}
