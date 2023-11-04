import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { EnvironmentService } from '@shared/common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';
import {
  ChatDto,
  ChatList,
  ChatsAndDancers,
  CreateChatResponse,
  CreateMessageRequest,
  DancerId,
  DancerMapDto,
  MessageResponse,
  MessageResponseWithChatId,
} from '../types/chat.types';
import { ProfileService } from '@shared/profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class ChatHttpService {
  private defaultOptions = {
    withCredentials: true,
  };
  private readonly chatApiUrl: string;
  private readonly dancerApiUrl: string;

  private profileService = inject(ProfileService);

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.chatApiUrl = `${this.environment.getApiUrl()}/chats`;
    this.dancerApiUrl = `${this.environment.getApiUrl()}/dancers`;
    console.log('ChatHttpService created');
    console.log('chatApiUrl', this.chatApiUrl);
    console.log('dancerApiUrl', this.dancerApiUrl);
  }

  createMessage$(
    chatId: string,
    message: CreateMessageRequest
  ): Observable<APIResponse<void>> {
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
    return (
      this.http
        // .get<ChatList>('/chats', this.defaultOptions)
        .get<ChatList>(this.chatApiUrl, this.defaultOptions)
        .pipe(map((chatList) => chatList.chats))
    );
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

  getChatsAndDancers$(): Observable<APIResponse<ChatsAndDancers>> {
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
  ): Observable<MessageResponseWithChatId> {
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
          ...messageResponse,
        }))
      );
  }

  private getAllDancerIds(chats: ChatDto[]): DancerId[] {
    const dancerIds = new Map();
    chats
      .flatMap((chat) => chat.dancerIds)
      .forEach((dancerId) => {
        if (!dancerIds.has(dancerId)) {
          dancerIds.set(dancerId, true);
        }
      });
    return Array.from(dancerIds.keys());
  }

  createChat$(participantId: string): Observable<CreateChatResponse> {
    const body = {
      dancerIds: [this.profileService.getProfile()?.id, participantId],
      type: 'DIRECT',
    };

    return this.http.post<CreateChatResponse>(
      `${this.chatApiUrl}`,
      body,
      this.defaultOptions
    );
  }

  sendMessage$(chatId: string, message: string): Observable<void> {
    return this.http.post<void>(
      `${this.chatApiUrl}/${chatId}/messages`,
      { text: message },
      this.defaultOptions
    );
  }
}
