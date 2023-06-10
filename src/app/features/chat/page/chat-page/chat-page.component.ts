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
}
