import { Injectable } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { isNonNull } from '@core/common/rxjs.utils';
import { ChatHttpService } from './chat-http.service';
import { ChatList, ChatsAndDancers } from '../types/chat.types';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _chatsAndDancers = new BehaviorSubject<ChatsAndDancers | null>(null);
  public readonly chatsAndDancers$: Observable<ChatsAndDancers> =
    this._chatsAndDancers.asObservable().pipe(filter(isNonNull));

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
        this._chatsAndDancers.next(response.payload);
      }
    });
  }

  fetchChatList(): void {}

  getChatList(): ChatsAndDancers | null {
    return this._chatsAndDancers.value;
  }
}
