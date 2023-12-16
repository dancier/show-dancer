import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatStateService } from '../data-access/chat-state.service';
import { ChatParticipant } from '../data-access/chat.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProfileOldService } from '@shared/data-access/profile/profile-old.service';
import { startWith } from 'rxjs/operators';
import { Profile } from '../../profile/data-access/types/profile.types';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-conversation-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white md:hidden">
      <button
        class="w-full border px-6 py-2 text-left text-lg text-red-600"
        (click)="returnToConversationList()"
      >
        &larr; Zurück zur Übersicht
      </button>
      <h1 *ngIf="participant()" class="px-6 py-4 text-2xl">
        Chat mit {{ participant()?.dancerName }}
      </h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationHeaderComponent {
  private chatState = inject(ChatStateService);

  ownProfileId: Signal<string | undefined> = toSignal(
    inject(ProfileOldService).profile$.pipe(
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
    return participant;
  });

  returnToConversationList(): void {
    this.chatState.selectChat$.next(null);
  }
}
