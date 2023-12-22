import { inject, Injectable, Signal } from '@angular/core';
import { ChatHttpService } from './chat-http.service';
import { TimerService } from '../../util/time/timer.service';
import { filter, NEVER, of, shareReplay } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { toApiResponse } from '../../util/http/response.utils';
import { OwnProfileService } from '../profile/own-profile.service';

@Injectable({
  providedIn: 'root',
})
export class UnreadMessagesService {
  location = inject(Location);
  chatHttp = inject(ChatHttpService);
  timerService = inject(TimerService);
  profileService = inject(OwnProfileService);

  constructor() {}

  private unreadChatsCount$ = this.timerService
    .interval('fetchUnreadChats', 5000)
    .pipe(
      filter(() => !this.location.path().includes('chat')),
      filter(() => this.profileService.getProfile()?.id !== null),
      switchMap(() => {
        return toApiResponse(this.chatHttp.getChats$());
      }),
      switchMap((response) => {
        if (response.fetchStatus === 'success') {
          return of(
            response.payload.filter(
              (chat) =>
                chat.lastMessage?.readByParticipants &&
                !chat.lastMessage.readByParticipants?.includes(
                  this.profileService.getProfile()!.id!
                )
            ).length
          );
        }
        return NEVER;
      }),
      startWith(0),
      shareReplay(1),
    );

  public unreadChatsCount: Signal<number> = toSignal(this.unreadChatsCount$, {
    initialValue: 0,
  });
}
