import { ChatAdaptState } from './chat-state.service';
import { createAdapter } from '@state-adapt/core';
import {
  ChatDto,
  CreateChatResponse,
  DancerMapDto,
  MessageResponseWithChatId,
} from './chat.types';
import { HttpErrorResponse } from '@angular/common/http';

export const chatStateAdapter = createAdapter<ChatAdaptState>()({
  chatsFetched: (state, chatsDto: ChatDto[]) => ({
    ...state,
    chatsFetchState: 'loaded',
    chatCreated: false,
    chats: [
      // only add new chats (chat id not in state yet)
      ...state.chats,
      ...chatsDto
        .filter(
          (chatDto) =>
            !state.chats.find((stateChat) => stateChat.id === chatDto.chatId)
        )
        .map((chatDto) => ({
          id: chatDto.chatId,
          participants: chatDto.dancerIds.map((dancerId) => ({
            id: dancerId,
          })),
          messages: [],
        })),
    ],
  }),

  chatsFetchedError: (state, chatsFetchError: HttpErrorResponse) => ({
    ...state,
    chatsFetchError,
    chatsFetchState: 'error',
  }),

  participantDetailsFetched: (state, dancerMap: DancerMapDto) => ({
    ...state,
    //for each chat, for each participant, add dancer details from dancerMap
    chats: state.chats.map((chat) => ({
      ...chat,
      participants: chat.participants.map((participant) => ({
        ...participant,
        ...dancerMap[participant.id],
      })),
    })),
  }),

  // TODO: error handling for this call
  participantDetailsFetchedError: (state, _error: HttpErrorResponse) => ({
    ...state,
  }),

  selectChat: (state, chatId: string | null) => ({
    ...state,
    activeChatId: chatId,
  }),

  chatMessagesFetched: (
    state,
    { messages, chatId }: MessageResponseWithChatId
  ) => ({
    ...state,
    newMessageSent: false,
    chats: state.chats.map((chat) => {
      // only add new messages to active chat
      if (chat.id !== chatId) return chat;
      return {
        ...chat,
        messages: [
          ...chat.messages,
          ...messages.filter(
            (message) => !chat.messages.find((m) => m.id === message.id)
          ),
        ],
      };
    }),
  }),

  openChatWith: (state, dancerId: string) => ({
    ...state,
    openChatWithParticipantId: dancerId,
  }),

  openedChatAfterFetch: (state, _openedChat: boolean) => ({
    ...state,
    openChatWithParticipantId: null,
  }),

  chatCreated: (state, chat: CreateChatResponse) => ({
    // select new chat
    ...state,
    activeChatId: chat.chatId,
    chatCreated: true,
  }),

  // TODO: error handling
  chatCreatedError: (state, _error: HttpErrorResponse) => ({
    ...state,
  }),

  messageSent: (state) => ({
    ...state,
    newMessageSent: true,
  }),

  // TODO: error handling
  messageSentError: (state, _error: HttpErrorResponse) => ({
    ...state,
  }),

  selectors: {
    chats: (state) => state.chats,
    chatsFetchState: (state) => state.chatsFetchState,
    chatsFetchError: (state) => state.chatsFetchError,

    participantsWithNoDetails: (state) =>
      state.chats
        .map((chat) => chat.participants)
        .flat()
        .filter((participant) => participant.dancerName === undefined),
    activeChatId: (state) => state.activeChatId,
    messagesForActiveChat: (state) =>
      state.chats.find((chat) => chat.id === state.activeChatId)?.messages ??
      [],
    openChatWithParticipantId: (state) => state.openChatWithParticipantId,
    chatCreated: (state) => state.chatCreated,
    activeChatParticipants: (state) => {
      const activeChat = state.chats.find(
        (chat) => chat.id === state.activeChatId
      );
      return activeChat?.participants ?? [];
    },
    newMessageSent: (state) => state.newMessageSent,
  },
});
