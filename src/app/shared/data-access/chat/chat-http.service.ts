import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { EnvironmentService } from '../environment.service';
import {
  asError,
  asSuccess,
  OldAPIResponse,
} from '../../util/http/response.types';
import {
  ChatDto,
  ChatList,
  ChatsAndDancers,
  CreateMessageRequest,
  DancerId,
  DancerMapDto,
  MessageResponse,
  MessagesWithChatId,
} from '../../../chat/data-access/chat.types';
import { OwnProfileService } from '../profile/own-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ChatHttpService {
  private defaultOptions = {
    withCredentials: true,
  };
  private readonly chatApiUrl: string;
  private readonly dancerApiUrl: string;
  private readonly messagesApiUrl: string;

  private profileService = inject(OwnProfileService);

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.chatApiUrl = `${this.environment.getApiUrl()}/chats`;
    this.dancerApiUrl = `${this.environment.getApiUrl()}/dancers`;
    this.messagesApiUrl = `${this.environment.getApiUrl()}/messages`;
  }

  createMessage$(
    chatId: string,
    message: CreateMessageRequest
  ): Observable<OldAPIResponse<void>> {
    return this.http
      .post<void>(
        `${this.chatApiUrl}/${chatId}/messages`,
        message,
        this.defaultOptions
      )
      .pipe(
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  getChats$(): Observable<ChatDto[]> {
    return this.http.get<ChatDto[]>(this.chatApiUrl, this.defaultOptions);
  }

  getDancers$(dancerIds: string[]): Observable<DancerMapDto> {
    const request = {
      dancerIds: dancerIds,
    };

    return this.http.post<DancerMapDto>(
      `${this.dancerApiUrl}`,
      request,
      this.defaultOptions
    );
  }

  getChatsAndDancersEasy$(): Observable<ChatsAndDancers> {
    return this.http.get<ChatList>(this.chatApiUrl, this.defaultOptions).pipe(
      map((chatList) => {
        const dancerIds = this.getAllDancerIds(chatList.chats);
        return {
          chatList,
          dancerIds,
        };
      }),
      switchMap(({ chatList, dancerIds }) => {
        const request = {
          dancerIds: dancerIds,
        };

        return this.http
          .post<DancerMapDto>(
            `${this.dancerApiUrl}`,
            request,
            this.defaultOptions
          )
          .pipe(map((dancerMap) => ({ dancerMap, chatList: chatList.chats })));
      })
    );
  }

  getChatsAndDancers$(): Observable<OldAPIResponse<ChatsAndDancers>> {
    return this.http.get<ChatList>(this.chatApiUrl, this.defaultOptions).pipe(
      map((chatList) => {
        const dancerIds = this.getAllDancerIds(chatList.chats);
        return {
          chatList,
          dancerIds,
        };
      }),
      switchMap(({ chatList, dancerIds }) => {
        const request = {
          dancerIds: dancerIds,
        };

        return this.http
          .post<DancerMapDto>(
            `${this.dancerApiUrl}`,
            request,
            this.defaultOptions
          )
          .pipe(map((dancerMap) => ({ dancerMap, chatList: chatList.chats })));
      }),
      map((value) => asSuccess(value)),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            return of(asError('SERVER_ERROR'));
        }
      })
    );
  }

  getMessages$(
    chatId: string,
    lastMessageId: string | null | undefined = null
  ): Observable<MessagesWithChatId> {
    let params = {};
    if (lastMessageId !== null && lastMessageId !== undefined) {
      params = {
        lastMessageId,
      };
    }
    return this.http
      .get<MessageResponse>(`${this.chatApiUrl}/${chatId}/messages`, {
        params: params,
        withCredentials: true,
      })
      .pipe(
        map((messageResponse) => ({
          chatId,
          messages: messageResponse.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          })),
        }))
      );
  }

  private getAllDancerIds(chats: ChatDto[]): DancerId[] {
    const dancerIds = new Map();
    chats
      .flatMap((chat) => chat.participantIds)
      .forEach((dancerId) => {
        if (!dancerIds.has(dancerId)) {
          dancerIds.set(dancerId, true);
        }
      });
    return Array.from(dancerIds.keys());
  }

  /** returns the chat id */
  createChat$(participantId: string): Observable<string> {
    const body = {
      participantIds: [this.profileService.getProfile()?.id, participantId],
    };

    return this.http
      .post<{ id: string }>(`${this.chatApiUrl}`, body)
      .pipe(map((res) => res.id));
  }

  sendMessage$(chatId: string, message: string): Observable<void> {
    return this.http.post<void>(
      `${this.chatApiUrl}/${chatId}/messages`,
      { text: message },
      this.defaultOptions
    );
  }

  setMessageAsRead(messageId: string): Observable<void> {
    return this.http.put<void>(`${this.messagesApiUrl}/${messageId}`, {
      read: true,
    });
  }
}
