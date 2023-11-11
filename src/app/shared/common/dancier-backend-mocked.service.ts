import { Injectable } from '@angular/core';
import { Server } from 'miragejs';
import {
  CreateChatResponse,
  DancerMapDto,
  MessageResponseWithChatId,
} from '@features/chat/common/types/chat.types';

const chats = [
  {
    chatId: 'chatId',
    dancerIds: ['dancerId1', 'dancerId2'],
    lastActivity: null,
    type: 'DIRECT',
    lastMessage: null,
  },
  {
    chatId: 'chatId2',
    dancerIds: ['dancerId1', 'dancerId3'],
    lastActivity: null,
    type: 'DIRECT',
    lastMessage: null,
  },
];

const dancerMap: DancerMapDto = {
  dancerId1: {
    id: 'dancerId1',
    dancerName: 'Dancer 1',
    city: 'City 1',
    profileImageHash: 'profileImageHash1',
  },
  dancerId2: {
    id: 'dancerId2',
    dancerName: 'Dancer 2',
    city: 'City 2',
    profileImageHash: 'profileImageHash2',
  },
  dancerId3: {
    id: 'dancerId3',
    dancerName: 'Dancer 3',
    city: 'City 3',
    profileImageHash: 'profileImageHash3',
  },
  dancerId4: {
    id: 'dancerId4',
    dancerName: 'Dancer 4',
    city: 'City 4',
    profileImageHash: 'profileImageHash3',
  },
};

const chatMessages: MessageResponseWithChatId = {
  chatId: 'chatId',
  messages: [
    {
      id: 'messageId1',
      authorId: 'dancerId1',
      text: 'Message 1',
      createdAt: '2021-01-01T00:00:00.000Z',
      readByDancers: [],
    },
    {
      id: 'messageId2',
      authorId: 'dancerId2',
      text: 'Message 2',
      createdAt: '2021-01-01T00:00:00.000Z',
      readByDancers: [],
    },
  ],
};

const createChatResponse: CreateChatResponse = {
  chatId: 'chatId3',
  dancerIds: ['dancerId1', 'dancerId4'],
  lastActivity: null,
  type: 'DIRECT',
  lastMessage: null,
};

@Injectable({
  providedIn: 'root',
})
export class DancierBackendMockedService {
  constructor() {}

  public mirageJsServer(): Server {
    return new Server({
      routes() {
        this.namespace = 'api';

        this.get('/chats', () => {
          return {
            chats: chats,
          };
        });

        this.post('/dancers', () => {
          return dancerMap;
        });

        this.get('/chats/:chatId/messages', () => {
          return chatMessages;
        });

        // response for create chat
        this.post('/chats', () => {
          return createChatResponse;
        });

        this.post('/chats/:chatId/messages', (schema, request) => {
          const requestBody = JSON.parse(request.requestBody);
          const message = requestBody.text;
          chatMessages.messages.push({
            id: 'messageId' + chatMessages.messages.length + 1,
            authorId: 'dancerId1',
            text: message,
            createdAt: '2021-01-01T00:00:00.000Z',
            readByDancers: [],
          });
          return chatMessages;
        });
      },
    });
  }
}
