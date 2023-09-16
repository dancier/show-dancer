import { computed, inject, Injectable, signal } from '@angular/core';
import { ChatHttpService } from '../../common/services/chat-http.service';
import { catchError, NEVER, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatDto } from '../../common/types/chat.types';

export type DemoChatState = {
  chats: ChatDto[];
};

@Injectable({
  providedIn: 'root',
})
export class ChatServiceDemoService {
  private apiService = inject(ChatHttpService);
  // chatFetchTimer$ = inject(TimerService).interval(1000);

  valueSubject = new Subject<number>();
  chatFetchTimer$ = this.valueSubject.asObservable();

  // chatFetchTimer$ = of(0);

  demoValue = 'Demo Welt';

  // chats: ChatDto[] = [];

  chatState = signal<DemoChatState>({
    chats: [],
  });

  // selectors
  chats = computed(() => this.chatState().chats);

  fetchedConversations$ = this.chatFetchTimer$.pipe(
    // startWith(-1),
    tap((v) => console.log('fetching chats', v)),
    switchMap(() => this.apiService.getChats$()),
    tap((v) => console.log('fetched chats', v)),
    catchError((_err: HttpErrorResponse) => {
      // this.error$.next(err);
      return NEVER;
    }),
    shareReplay(1)
  );

  constructor() {
    console.log('ChatServiceDemoService created');
    this.fetchedConversations$.subscribe((value) => {
      console.log('fetchedConversations$ value', value);
      // this.chats = value;
      this.chatState.update(() => ({
        chats: value,
      }));
    });
  }
}
