import { computed, inject, Injectable, signal } from '@angular/core';
import { ChatHttpService } from '../../common/services/chat-http.service';
import { catchError, NEVER, shareReplay, Subject, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatDto } from '../../common/types/chat.types';
import { TimerService } from '@shared/util/time/timer.service';

export type DemoChatState = {
  chats: ChatDto[];
};

@Injectable({
  providedIn: 'root',
})
export class ChatServiceDemoService {
  private apiService = inject(ChatHttpService);
  // @ts-ignore
  chatFetchTimer$ = inject(TimerService).interval('fetch-chats', 1000);

  valueSubject = new Subject<number>();
  // chatFetchTimer$ = this.valueSubject.asObservable();

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
    switchMap(() => this.apiService.getChats$()),
    catchError((_err: HttpErrorResponse) => {
      return NEVER;
    }),
    shareReplay(1)
  );

  constructor() {
    this.fetchedConversations$.subscribe((value) => {
      // this.chats = value;
      this.chatState.update(() => ({
        chats: value,
      }));
    });
  }
}
