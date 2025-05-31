import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { AlertComponent } from '@shared/ui/alert/alert.component';
import { ChatMessageComposerComponent } from './ui/message-composer/chat-message-composer.component';
import { ChatMessagesComponent } from './ui/chat-messages/chat-messages.component';
import { ChatConversationListComponent } from './ui/conversation-list/chat-conversation-list.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChatStateService } from './data-access/chat-state.service';
import { ChatConversationHeaderComponent } from './ui/chat-conversation-header.component';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-chat-page',
  template: `<!-- eslint-disable @angular-eslint/template/cyclomatic-complexity -->
    <div class="mx-auto my-12 max-w-[1200px] px-4 md:px-10">
      <h1 class="page-header">Deine Chats</h1>

      <ng-container *ngIf="chatState.chatsFetchState() === 'loaded'">
        <ng-container
          *ngIf="chatState.chats().length > 0; else noConversations"
        >
          <div class="flex h-[610px] border">
            <app-chat-conversation-list
              class="min-w-[300px] overflow-y-auto overflow-x-hidden border-r border-gray-300 py-2 max-md:flex-1 md:w-[300px] md:flex-none"
              [class.max-md:hidden]="chatState.activeChatId() !== null"
            ></app-chat-conversation-list>
            <div
              class="flex w-full flex-col bg-gray-100"
              [class.max-md:hidden]="chatState.activeChatId() === null"
            >
              <app-chat-conversation-header></app-chat-conversation-header>
              <ng-container *ngIf="hasActiveChat(); else noActiveChat">
                <app-chat-messages class="grow"></app-chat-messages>
                <app-chat-message-composer
                  class="flex-none"
                ></app-chat-message-composer>
              </ng-container>
              <ng-template #noActiveChat>
                <div class="flex h-full flex-col items-center justify-center">
                  <p class="font-lg text-gray-500">
                    Wähle einen Chat aus der Liste aus.
                  </p>
                </div>
              </ng-template>
            </div>
          </div>
        </ng-container>
      </ng-container>

      <ng-template #noConversations>
        <div class="">
          <h1 class="mb-4 font-bold">Du hast noch keine Chats</h1>
          <p class="text-gray-500">
            Schaue dir deine Empfehlungen an, um Nutzer zu finden, denen du eine
            Nachricht schreiben kannst.
          </p>
          <p class="text-gray-500">
            Über neue Empfehlungen wirst du von uns per E-Mail informiert.
          </p>
          <!--    Button zu der Empfehlungsseite -->
          <div class="my-4">
            <a
              class="rounded bg-blue-500 py-2 px-4 font-bold text-white no-underline hover:bg-blue-700"
              routerLink="/recommendations"
              >Zu den Empfehlungen</a
            >
          </div>
        </div>
      </ng-template>

      <ng-container *ngIf="chatState.chatsFetchState() === 'error'">
        <app-alert alertType="error" icon="error">
          <span>
            Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
          </span>
        </app-alert>
      </ng-container>

      <ng-container
        *ngIf="
          (delayLoading$ | async) === 0 &&
          chatState.chatsFetchState() === 'loading'
        "
      >
        <div class="flex rounded border bg-gray-100">
          <div class="w-[300px] flex-col">
            <div *ngFor="let _ of [].constructor(4)" class="flex items-center">
              <div
                class="m-4 h-16 w-16 animate-pulse rounded-full bg-gray-400"
              ></div>
              <div class="flex flex-grow flex-col gap-2 px-4 py-2">
                <div class="h-6 w-full animate-pulse rounded bg-gray-400"></div>
                <div class="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </ng-container>
    </div>`,
  styleUrls: ['./chat.component.scss'],
  providers: [ChatStateService],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgIf,
    ChatConversationListComponent,
    ChatMessagesComponent,
    ChatMessageComposerComponent,
    RouterLink,
    AlertComponent,
    NgFor,
    AsyncPipe,
    ChatConversationHeaderComponent,
  ],
})
export class ChatComponent {
  chatState = inject(ChatStateService);
  delayLoading$ = interval(100).pipe(take(1));
  hasActiveChat: Signal<boolean> = this.chatState.hasActiveChat;
}
