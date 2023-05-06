import { Injectable, OnDestroy } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { Conversation, ChatMessage } from '../types/chat.types';
import {
  concatMap,
  filter,
  interval,
  Observable,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ChatService } from './chat.service';
import { ProfileService } from '@core/profile/profile.service';
import { EnvironmentService } from '@core/common/environment.service';

export type ChatState = {
  conversationsFetchState: 'init' | 'loading' | 'complete' | 'error';
  conversations: Conversation[];
  selectedConversation?: Conversation;
  messagesFetchState: 'init' | 'loading' | 'complete';
  messages: ChatMessage[];
  ownProfileId?: string;
};

const defaultState: ChatState = {
  conversationsFetchState: 'init',
  conversations: [],
  selectedConversation: undefined,
  messagesFetchState: 'init',
  messages: [],
};

@Injectable()
export class ChatStore
  extends ComponentStore<ChatState>
  implements OnStateInit, OnDestroy
{
  constructor(
    private chatService: ChatService,
    private profileService: ProfileService,
    private environmentService: EnvironmentService
  ) {
    super(defaultState);
  }

  ngrxOnStateInit(): void {
    this.patchState({ conversationsFetchState: 'loading' });
    this.fetchOwnProfileId();
    this.fetchConversations();
    if (!this.environmentService.getJestTestmode()) {
      // TODO: test report problems with interval, look into it...
      interval(1000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.fetchConversations();
        });

      interval(1000)
        .pipe(
          takeUntil(this.destroy$),
          withLatestFrom(this.selectedConversation$)
        )
        .subscribe(([_, selectedConversation]) => {
          if (selectedConversation) {
            this.fetchMessages(selectedConversation.chatId);
          }
        });
    }
  }

  //
  // selectors
  //
  readonly conversations$ = this.select((state) => state.conversations);
  readonly selectedConversation$ = this.select(
    (state) => state.selectedConversation
  );
  readonly selectedConversationMessages$ = this.select(
    (state) => state.messages
  );
  readonly ownProfileId$ = this.select((state) => state.ownProfileId);
  readonly viewModel$ = this.select({
    conversations: this.conversations$,
    selectedConversation: this.selectedConversation$,
    selectedConversationMessages: this.selectedConversationMessages$,
  });

  //
  // updater
  //

  readonly setConversations = this.updater(
    (state, conversations: Conversation[]) => {
      // eslint-disable-next-line no-console
      console.log('setConversations', conversations);
      return {
        ...state,
        conversationsFetchState: 'complete',
        conversations,
      };
    }
  );

  readonly setSelectedConversation = this.updater((state, chatId: string) => {
    const selectedConversation = state.conversations.find(
      (conversation) => conversation.chatId === chatId
    );
    if (!selectedConversation) {
      return state;
    }
    // eslint-disable-next-line no-console
    console.log('setSelectedConversation', selectedConversation);
    return {
      ...state,
      selectedConversation,
      messagesFetchState: 'loading',
    };
  });

  readonly setFetchedMesssages = this.updater(
    (state, messages: ChatMessage[]) => {
      // eslint-disable-next-line no-console
      console.log('setFetchedMessages', messages);
      // check if state.messages contains the same messages
      // if so, don't update state
      if (
        state.messages.length === messages.length &&
        state.messages.every(
          (message, index) => message.id === messages[index].id
        )
      ) {
        return state;
      }

      return {
        ...state,
        messagesFetchState: 'complete',
        messages,
      };
    }
  );

  //
  // effects
  //

  readonly fetchConversations = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.chatService.getConversations$().pipe(
          tapResponse(
            (conversations) => this.setConversations(conversations),
            (error) => {
              this.patchState({ conversationsFetchState: 'error' });
              // eslint-disable-next-line no-console
              console.error(error);
            }
          )
        )
      )
    )
  );

  readonly fetchOwnProfileId = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.profileService.profile$.pipe(
          tap((profile) => {
            this.patchState({ ownProfileId: profile.id });
          })
        )
      )
    )
  );

  readonly selectConversation = this.effect((chatId$: Observable<string>) =>
    chatId$.pipe(
      tap((chatId) => this.setSelectedConversation(chatId)),
      tap((chatId) => this.fetchMessages(chatId))
    )
  );

  readonly fetchMessages = this.effect((chatId$: Observable<string>) =>
    chatId$.pipe(
      switchMap((chatId) =>
        this.chatService.fetchMessagesForChat(chatId).pipe(
          tapResponse(
            (messages) => this.setFetchedMesssages(messages),
            (error) => {
              // eslint-disable-next-line no-console
              console.error(error);
            }
          )
        )
      )
    )
  );

  readonly sendMessage = this.effect((message$: Observable<string>) =>
    message$.pipe(
      withLatestFrom(this.selectedConversation$),
      filter(([, selectedConversation]) => !!selectedConversation),
      concatMap(([message, selectedConversation]) =>
        this.chatService
          .sendMessage$(selectedConversation!.chatId, message)
          .pipe(
            tapResponse(
              () => this.fetchMessages(selectedConversation!.chatId),
              (error) => {
                // eslint-disable-next-line no-console
                console.error(error);
              }
            )
          )
      )
    )
  );

  private readonly createNewConversation = this.effect(
    (participantId$: Observable<string>) =>
      participantId$.pipe(
        switchMap((participantId) =>
          this.chatService.createChat$(participantId).pipe(
            tapResponse(
              (chat) => {
                this.fetchConversations();
                this.selectConversation(chat.chatId);
              },
              (error) => {
                // eslint-disable-next-line no-console
                console.error(error);
              }
            )
          )
        )
      )
  );

  readonly openConversation = this.effect(
    (participantId$: Observable<string>) =>
      participantId$.pipe(
        withLatestFrom(this.state$),
        filter(([, state]) => state.conversationsFetchState === 'complete'),
        tap(([participantId, state]) => {
          const existingConversation = state.conversations.find(
            (conversation) =>
              conversation.participants.some(
                (participant) => participant.id === participantId
              )
          );
          if (existingConversation) {
            // there is a chat with this participant already
            this.selectConversation(existingConversation.chatId);
          } else {
            // create a new chat with this participant
            this.createNewConversation(participantId);
          }
        })
      )
  );
}
