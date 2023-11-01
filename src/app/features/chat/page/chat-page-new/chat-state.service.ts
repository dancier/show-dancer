import { inject, Injectable, Signal } from '@angular/core';
import { adapt } from '@state-adapt/angular';
import { ChatHttpService } from '../../common/services/chat-http.service';
import { getRequestSources, Source, toSource } from '@state-adapt/rxjs';
import { ChatMessage, ChatParticipant } from '../../common/types/chat.types';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  distinct,
  filter,
  map,
  merge,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { chatStateAdapter } from './chat-state.adapter';
import { TimerService } from '@shared/time/timer.service';
import { startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export type SingleChatState = {
  id: string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
};

export type ChatAdaptState = {
  chats: SingleChatState[];
  chatsFetchState: 'loading' | 'loaded' | 'error';
  chatsFetchError: HttpErrorResponse | null;
  activeChatId: string | null;
  openChatWithParticipantId: string | null;
  chatCreated: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  private readonly storePath = 'chat';
  private activatedRoute = inject(ActivatedRoute);

  // either we have a chat open with that DancerId or we create a new one
  // TODO: logic can possibly be simplified when we do this only after the initial fetch
  openChatWith$ = this.activatedRoute.params.pipe(
    filter((params) => !!params['participantId']),
    map((params) => params['participantId']),
    toSource('[Chat] rememberToOpenChatWithParticipant')
  );

  // actually selected chat that must exist (doesn't create new chat)
  // TODO: have selection only change route and have store react to new route params
  selectChat$ = new Source<string | null>('[Chat] selectChat');

  createChat$ = new Source<string>('[Chat] createNewChat');

  // Adapters
  //
  private readonly initialState: ChatAdaptState = {
    chats: [],
    chatsFetchState: 'loading',
    chatsFetchError: null,
    activeChatId: null,
    openChatWithParticipantId: null,
    chatCreated: false,
  };

  private chatStore = adapt(
    [this.storePath, this.initialState, chatStateAdapter],
    (store) => {
      const timerService = inject(TimerService);
      const chatHttpService = inject(ChatHttpService);

      const fetchChatsSources = getRequestSources(
        '[Chat] fetchChats',
        merge(
          timerService.interval('chatFetchTrigger', 5000),
          store.chatCreated$.pipe(filter((hasCreated) => !!hasCreated))
        ).pipe(
          startWith(-1),
          switchMap(() => chatHttpService.getChats$())
        )
      );

      const fetchParticipantDetailsSource = getRequestSources(
        '[Chat] fetchParticipantDetails',
        store.participantsWithNoDetails$.pipe(
          filter((participants) => participants.length > 0),
          map((participants: ChatParticipant[]) =>
            participants.map((p) => p.id)
          ),
          switchMap((participantsWithNoDetails) =>
            chatHttpService.getDancers$(participantsWithNoDetails)
          )
        )
      );

      const fetchChatMessagesSource = getRequestSources(
        '[Chat] fetchMessages',
        merge(
          timerService.interval('chatMessagesFetchTrigger', 5000),
          store.activeChatId$.pipe(distinct())
        ).pipe(
          switchMap(() => store.activeChatId$),
          filter((chatId) => chatId !== null),
          switchMap((chatId) => chatHttpService.getMessages$(chatId!))
        )
      );

      const openedChatAfterFetchSource = store.chatsFetchState$.pipe(
        filter((state) => state === 'loaded'),
        tap(() => console.log('loaded chats')),
        switchMap(() => store.openChatWithParticipantId$),
        tap((v) => console.log('open chat with participant', v)),
        filter((participantId) => participantId !== null),
        withLatestFrom(store.chats$),
        map(([participantId, chats]) => {
          const existingChat = chats.find((chat) =>
            chat.participants.find((p) => p.id === participantId)
          );
          console.log('existing chat', existingChat);
          if (existingChat) {
            this.selectChat$.next(existingChat.id);
            return true;
          } else {
            this.createChat$.next(participantId!);
            return true;
          }
        }),
        toSource('[Chat] openedChatAfterFetch')
      );

      const createChatSource = getRequestSources(
        '[Chat] chatCreated',
        this.createChat$.pipe(
          switchMap(({ payload: participantId }) =>
            chatHttpService.createChat$(participantId)
          )
        )
      );

      return {
        chatsFetched: fetchChatsSources.success$,
        chatsFetchedError: fetchChatsSources.error$,
        participantDetailsFetched: fetchParticipantDetailsSource.success$,
        participantDetailsFetchedError: fetchParticipantDetailsSource.error$,
        selectChat: this.selectChat$,
        chatMessagesFetched: fetchChatMessagesSource.success$,
        chatMessagesFetchedError: fetchChatMessagesSource.error$,
        openChatWith: this.openChatWith$,
        openedChatAfterFetch: openedChatAfterFetchSource,
        chatCreated: createChatSource.success$,
        chatCreatedError: createChatSource.error$,
      };
    }
  );

  // Selectors
  // public signals for components to consume
  chats: Signal<SingleChatState[]> = toSignal(this.chatStore.chats$, {
    requireSync: true,
  });
  chatsFetchState: Signal<'loading' | 'loaded' | 'error'> = toSignal(
    this.chatStore.chatsFetchState$,
    {
      requireSync: true,
    }
  );
  chatsFetchError = toSignal(this.chatStore.chatsFetchError$, {
    requireSync: true,
  });
  activeChatId = toSignal(this.chatStore.activeChatId$, { requireSync: true });
  messagesForActiveChat = toSignal(this.chatStore.messagesForActiveChat$, {
    requireSync: true,
  });
  activeChatParticipants = toSignal(this.chatStore.activeChatParticipants$, {
    requireSync: true,
  });

  constructor() {}
}
