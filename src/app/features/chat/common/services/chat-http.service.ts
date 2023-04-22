import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { EnvironmentService } from '@core/common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';
import {
  ChatDto,
  ChatList,
  ChatsAndDancers,
  CreateMessageRequest,
  DancerId,
  DancerMapDto,
  MessageResponse,
} from '../types/chat.types';

@Injectable({
  providedIn: 'root',
})
export class ChatHttpService {
  private defaultOptions = {
    withCredentials: true,
  };
  private readonly chatApiUrl: string;
  private readonly dancerApiUrl: string;

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) {
    this.chatApiUrl = `${this.environment.getApiUrl()}/chats`;
    this.dancerApiUrl = `${this.environment.getApiUrl()}/dancers`;
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
    lastMessageId: string | null | undefined
  ): Observable<APIResponse<MessageResponse>> {
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
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
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
}
