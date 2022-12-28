import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { EnvironmentService } from '@core/common/environment.service';
import { APIResponse, asError, asSuccess } from '@shared/http/response.types';
import {
  ChatList,
  ChatsAndDancers,
  DancerMap,
  DancersRequest,
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

  getChatsAndDancers$(): Observable<APIResponse<ChatsAndDancers>> {
    return this.http
      .get<ChatList>(`${this.chatApiUrl}`, this.defaultOptions)
      .pipe(
        switchMap((chatList) => {
          let dancerIds = new Set(
            chatList.chats.flatMap((chat) => chat.dancerIds)
          );
          let request = {
            dancerIds: Array.from(dancerIds.values()),
          };
          return this.http
            .post<DancerMap>(
              `${this.dancerApiUrl}`,
              request,
              this.defaultOptions
            )
            .pipe(
              map((dancerMap) => ({ dancerMap, chatList: chatList.chats }))
            );
        }),
        map(asSuccess),
        catchError((error: HttpErrorResponse) => {
          switch (error.status) {
            default:
              return of(asError('SERVER_ERROR'));
          }
        })
      );
  }

  getMessages(
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
}
