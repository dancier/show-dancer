import { ChatAdaptState, SingleChatState } from './chat-state.service';
import { createAdapter } from '@state-adapt/core';
import {
  ChatDto,
  ChatMessage,
  DancerMapDto,
  MessagesWithChatId,
} from './chat.types';
import { HttpErrorResponse } from '@angular/common/http';

export const chatStateAdapter = createAdapter<ChatAdaptState>()({
  chatsFetched: (state, chatsDto: ChatDto[]) => {
    const chatsFromDto = chatsDto
      .reverse() // latest created chat first
      // .filter(
      //   (chatDto) =>
      //     !state.chats.find((stateChat) => stateChat.id === chatDto.chatId)
      // )
      .map((chatDto) => ({
        id: chatDto.chatId,
        participants: chatDto.participantIds.map((dancerId) => ({
          id: dancerId,
        })),
        messages: [],
        lastMessage: chatDto.lastMessage,
      }));

    return {
      ...state,
      chatsFetchState: 'loaded',
      chatCreated: false,
      chats: [
        ...state.chats.map((chat) => {
          const newChat = chatsFromDto.find(
            (newChat) => newChat.id === chat.id
          );
          if (!newChat) {
            return chat;
          }
          return updateChat(chat, newChat);
        }),
        ...chatsFromDto.filter(
          (newChat) => !state.chats.find((chat) => chat.id === newChat.id)
        ),
      ],
    };
  },

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
    // TODO: clear unread chat for this chat
    ...state,
    activeChatId: chatId,
    // TODO: clear unread chat for this chat
    chats: state.chats.map((chat) => {
      if (chat.id !== chatId) return chat;
      return {
        ...chat,
        lastMessage: chat.lastMessage
          ? {
              ...chat.lastMessage,
              readByParticipants: chat.participants.map((p) => p.id),
            }
          : null,
      };
    }),
  }),

  chatMessagesFetched: (state, { messages, chatId }: MessagesWithChatId) => {
    messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return {
      ...state,
      newMessageSent: false,
      chats: state.chats.map((chat) => {
        // only add new messages to active chat
        if (chat.id !== chatId) return chat;
        return {
          ...chat,
          messages: [
            ...chat.messages.map((message) => {
              const updatedMessage = messages.find((m) => m.id === message.id);
              if (!updatedMessage) return message;
              return updateMessage(message, updatedMessage);
            }),
            ...messages.filter(
              (message) => !chat.messages.find((m) => m.id === message.id)
            ),
          ],
        };
      }),
    };
  },

  openChatWith: (state, dancerId: string) => ({
    ...state,
    openChatWithParticipantId: dancerId,
  }),

  openedChatAfterFetch: (state, _openedChat: boolean) => ({
    ...state,
    openChatWithParticipantId: null,
  }),

  chatCreated: (state, chatId: string) => ({
    // select new chat
    ...state,
    activeChatId: chatId,
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

  setMessagesAsRead: (state, { chatId, profileId }) => ({
    ...state,
    chats: state.chats.map((chat) => {
      if (chat.id !== chatId) return chat;
      return {
        ...chat,
        lastMessage: chat.lastMessage
          ? {
              ...chat.lastMessage,
              readByParticipants: [
                ...(chat.lastMessage.readByParticipants || []),
                profileId,
              ],
            }
          : null,
      };
    }),
  }),

  profileIdChanged: (state, profileId: string | undefined) => ({
    ...state,
    ownProfileId: profileId,
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
    hasActiveChat: (state) => state.activeChatId !== null,
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
    activeChatUnreadMessages: (state) => {
      const activeChat = state.chats.find(
        (chat) => chat.id === state.activeChatId
      );
      if (!activeChat || !state.ownProfileId) return [];
      return activeChat.messages.filter(
        (message) =>
          message.readByParticipants &&
          !message.readByParticipants.includes(state.ownProfileId!)
      );
    },
  },
});

function updateMessage(
  oldMessage: ChatMessage,
  newMessage: ChatMessage
): ChatMessage {
  // for each property in newMessage, update oldMessage, only if they are different
  Object.keys(newMessage).forEach((key: string) => {
    const keyOfMessage = key as keyof ChatMessage;
    if (newMessage[keyOfMessage] !== oldMessage[keyOfMessage]) {
      const newValue = newMessage[keyOfMessage];
      oldMessage[keyOfMessage] = newValue as any;
    }
  });
  return oldMessage;
}

function updateChat(
  oldChat: SingleChatState,
  newChat: SingleChatState
): SingleChatState {
  // for each property in newChat, update oldChat, only if they are different
  if (
    JSON.stringify(oldChat.lastMessage) !== JSON.stringify(newChat.lastMessage)
  ) {
    oldChat.lastMessage = newChat.lastMessage;
  }
  return oldChat;
}
