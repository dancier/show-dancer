import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatStateService } from '../page/chat-page-new/chat-state.service';
import { ChatParticipant } from '../common/types/chat.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileService } from '@shared/profile/profile.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../profile/common/types/profile.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-conversation-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Chat mit {{ participant()?.dancerName }}</h1>
      <button (click)="returnToConversationList()">Zurück zur Übersicht</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationHeaderComponent {
  private chatState = inject(ChatStateService);

  ownProfileId: Signal<string | undefined> = toSignal(
    inject(ProfileService).profile$.pipe(
      startWith({
        id: 'dancerId1',
      } as Profile),
      map((profile) => profile.id)
    )
  );

  participant: Signal<ChatParticipant | undefined> = computed(() => {
    const participant = this.ownProfileId()
      ? this.chatState
          .activeChatParticipants()
          .find((participant) => participant.id !== this.ownProfileId())
      : undefined;
    //console.log('chatState', this.chatState.chats());
    //console.log('conversation', this.conversation());
    //console.log('participant', participant);
    return participant;
  });

  returnToConversationList(): void {
    console.log('returnToConversationList');
    this.chatState.selectChat$.next(null);
  }
}
