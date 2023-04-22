import { Injectable } from '@angular/core';
import {
  ComponentStore,
  OnStateInit,
  tapResponse,
} from '@ngrx/component-store';
import { Conversation, ChatMessage, DancerId } from '../types/chat.types';
import { switchMap } from 'rxjs';
import { ChatService } from './chat.service';
import { ProfileService } from '../../../profile/common/services/profile.service';

export type ChatState = {
  conversationsFetchState: 'init' | 'loading' | 'complete' | 'error';
  conversations: Conversation[];
  selectedConversation: DancerId;
  messagesFetchState: 'init' | 'loading' | 'complete';
  messages: ChatMessage[];
};

const defaultState: ChatState = {
  conversationsFetchState: 'init',
  conversations: [],
  selectedConversation: '',
  messagesFetchState: 'init',
  messages: [],
};

@Injectable()
export class ChatStore
  extends ComponentStore<ChatState>
  implements OnStateInit
{
  constructor(
    private chatService: ChatService,
    private profileService: ProfileService
  ) {
    super(defaultState);
  }

  ngrxOnStateInit(): void {
    // TODO: also repeatedly fetch conversations
    this.patchState({ conversationsFetchState: 'loading' });
    this.fetchConversations();
  }

  readonly conversations$ = this.select((state) => state.conversations);
  readonly selectedConversation$ = this.select(
    (state) => state.selectedConversation
  );
  readonly selectedConversationMessages$ = this.select(
    (state) => state.messages
  );
  readonly viewModel$ = this.select({
    conversations: this.conversations$,
    selectedConversation: this.selectedConversation$,
    selectedConversationMessages: this.selectedConversationMessages$,
  });

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
}
