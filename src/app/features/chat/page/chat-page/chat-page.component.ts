import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ChatStore } from '../../common/services/chat.store';
import { provideComponentStore } from '@ngrx/component-store';
import { ActivatedRoute } from '@angular/router';
import { filter, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  providers: [provideComponentStore(ChatStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent implements OnInit {
  // conversations!: ChatParticipant[];

  constructor(public chatStore: ChatStore, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.chatStore.initialFetchCompleted$
      .pipe(
        filter((completed) => completed),
        withLatestFrom(this.route.params),
        filter(([_, params]) => !!params['participantId'])
      )
      .subscribe(([_, params]) => {
        this.chatStore.openConversation(params['participantId']);
      });
  }

  // chatData$!: Observable<ChatData>;
  //
  // constructor(
  //   public chatService: ChatService,
  //   public profileService: ProfileService
  // ) {}
  // ngOnInit(): void {
  //   this.chatData$ = combineLatest([
  //     this.chatService.chats$,
  //     this.chatService.dancers$,
  //     this.profileService.profile$,
  //   ]).pipe(map(([chats, dancers, profile]) => ({ chats, dancers, profile })));
  // }
  //
  // ngOnDestroy(): void {
  //   this.chatService.stopPollingForMessages();
  // }
  //
  // selectChat(chatId: string): void {
  //   this.chatService.setSelectedChatId(chatId);
  //   this.chatService.pollForNewMessages();
  // }
}
