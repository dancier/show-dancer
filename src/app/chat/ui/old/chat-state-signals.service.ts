// import { computed, inject, Injectable, signal } from '@angular/core';
// import { ChatDto, Conversation } from '../../common/types/chat.types';
// import { ChatHttpService } from '../../common/services/chat-http.service';
// import {
//   catchError,
//   map,
//   NEVER,
//   Subject,
//   switchMap,
//   combineLatest,
//   Observable,
//   tap,
//   shareReplay,
// } from 'rxjs';
// import { startWith } from 'rxjs/operators';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import { HttpErrorResponse } from '@angular/common/http';
// import { APIError } from '@shared/http/response.types';
// import { TimerService } from '@shared/time/timer.service';
//
// export type ChatState = {
//   conversations: Conversation[];
//   error: APIError | null;
//   status: 'loading' | 'success' | 'error';
// };
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ChatStateSignalsService {
//   demoValue = '4';
//
//   private apiService = inject(ChatHttpService);
//
//   private state = signal<ChatState>({
//     conversations: [],
//     error: null,
//     status: 'loading',
//   });
//
//   // selectors
//   conversations = computed(() => this.state().conversations);
//   error = computed(() => this.state().error);
//   status = computed(() => this.state().status);
//
//   // sources
//   conversationSelected$ = new Subject<void>();
//   error$ = new Subject<HttpErrorResponse>();
//
//   // TEST ONLY WORKS WHEN DISABLING THE NEXT LINE
//   // chatFetchTimer$ = interval(1000);
//   // chatFetchTimer$ = new Subject<void>();
//   chatFetchTimer$ = inject(TimerService).interval('chat', 1000);
//
//   // TODO: implement fetching messages (keep them in map for each chat?)
//   // messagesFetchTimer$ = interval(1000);
//
//   fetchedConversations$ = this.chatFetchTimer$.pipe(
//     startWith(-1),
//     tap((v) => console.log('fetching chats', v)),
//     switchMap(() => this.apiService.getChats$()),
//     tap((v) => console.log('fetched chats', v)),
//     catchError((err: HttpErrorResponse) => {
//       this.error$.next(err);
//       return NEVER;
//     }),
//     shareReplay(1)
//   );
//
//   dancersInfo$ = this.fetchedConversations$.pipe(
//     map((chats) => this.collectDancerIds(chats)),
//     switchMap((dancerIds) => this.apiService.getDancers$(dancerIds)),
//     catchError((err: HttpErrorResponse) => {
//       this.error$.next(err);
//       return NEVER;
//     })
//   );
//
//   fetchedConversationsWithDancersInfo$: Observable<Conversation[]> =
//     combineLatest([this.fetchedConversations$, this.dancersInfo$]).pipe(
//       map(([chats, dancersInfo]) => {
//         return chats.map((chat) => ({
//           chatId: chat.chatId,
//           participants: chat.dancerIds.map((dancerId) => ({
//             ...dancersInfo[dancerId],
//           })),
//         }));
//       })
//     );
//
//   private collectDancerIds(chats: ChatDto[]): string[] {
//     const dancerIds: string[] = [];
//     chats.forEach((chat) => {
//       chat.dancerIds.forEach((dancerId) => {
//         if (!dancerIds.includes(dancerId)) {
//           dancerIds.push(dancerId);
//         }
//       });
//     });
//     return dancerIds;
//   }
//
//   constructor() {
//     // create setInterval method that calls chatFetchTimer$ every 1 second
//     // window.setInterval(() => {
//     //   this.chatFetchTimer$.next();
//     // }, 1000);
//
//     // reducers
//     this.fetchedConversationsWithDancersInfo$
//       .pipe(
//         takeUntilDestroyed(),
//         tap((conversations) => console.log('conversations 2', conversations))
//       )
//       .subscribe((conversations) => {
//         console.log('conversations 3', conversations);
//         this.state.update((state) => ({
//           ...state,
//           conversations,
//           status: 'success',
//         }));
//       });
//
//     this.error$.pipe(takeUntilDestroyed()).subscribe((_error) => {
//       this.state.update((state) => ({
//         ...state,
//         error: 'SERVER_ERROR',
//         status: 'error',
//       }));
//     });
//   }
// }
