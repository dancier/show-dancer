import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import {
  Chat,
  ChatMessage,
  ChatParticipant,
  DancerId,
} from '../types/chat.types';
import { switchMap } from 'rxjs';
import { ChatService } from './chat.service';

export type ChatState = {
  conversations: ChatParticipant[];
  selectedConversation: DancerId;
  selectedConversationMessages?: ChatMessage[];
};

const defaultState: ChatState = {
  conversations: [],
  selectedConversation: '',
  selectedConversationMessages: [],
};

@Injectable()
export class ChatStore extends ComponentStore<ChatState> {
  constructor(private chatService: ChatService) {
    super(defaultState);
  }

  ngrxOnStateInit(): void {
    // TODO: also repeatedly fetch conversations
    this.fetchConversations();
  }

  readonly conversations$ = this.select((state) => state.conversations);

  readonly fetchConversations = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        this.chatService.fetchAllChats$().pipe(
          tapResponse(
            (conversations) => this.setConversations(conversations),
            (error) => console.error(error)
          )
        )
      )
    )
  );

  readonly setConversations = this.updater((state, chats: Chat[]) => ({
    ...state,
    conversations: chats.map((chat) => ({
      id: chat.chatId,
      // TODO: fetch dancer name from dancer service
      dancerName: chat.dancerIds[0],
      city: 'TODO',
      profileImageHash: 'TODO',
    })),
  }));
}
