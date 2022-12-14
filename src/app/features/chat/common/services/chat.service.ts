import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { isNonNull } from '@core/common/rxjs.utils';
import { ChatHttpService } from './chat-http.service';
import {
  Chat,
  ChatMessage,
  DancerMap,
  MessagesByChatMap,
} from '../types/chat.types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chats = new BehaviorSubject<Chat[] | null>(null);
  private _dancers = new BehaviorSubject<DancerMap | null>(null);
  public readonly chats$: Observable<Chat[]> = this._chats
    .asObservable()
    .pipe(filter(isNonNull));
  public readonly dancers$: Observable<DancerMap> = this._dancers
    .asObservable()
    .pipe(filter(isNonNull));
  private _messages = new BehaviorSubject<MessagesByChatMap | null>(null);
  public readonly messages$: Observable<MessagesByChatMap> = this._messages
    .asObservable()
    .pipe(filter(isNonNull));

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
    let messagesForChat = this.getSortedMessagesForChat(chatId);

    let lastMessageId =
      messagesForChat !== null ? messagesForChat.at(-1)?.id : null;

    this.chatHttpService
      .getMessages(chatId, lastMessageId)
      .subscribe((response) => {
        if (response.isSuccess) {
          let existingMessagesForChat = this.getSortedMessagesForChat(chatId) || [];
          let messagesForAllChats = this._messages.value
          let messagesForChat = existingMessagesForChat
            ?.concat(response.payload.messages)
            .sort(
              (a, b) =>
                a.creationTimestamp.valueOf() - b.creationTimestamp.valueOf()
            );
              (messagesForAllChats || {})[chatId] = messagesForChat;
        }
      });
  }

  getSortedMessagesForChat(chatId: string): ChatMessage[] | null {
    if (this._messages === null || this._messages.value === null) {
      return null;
    }
    let messagesForChat = this._messages.value[chatId];
    return messagesForChat?.sort(
      (a, b) => a.creationTimestamp.valueOf() - b.creationTimestamp.valueOf()
    );
  }
}
