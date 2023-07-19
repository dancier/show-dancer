import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatListEntryComponent } from './components/chat/chat-list-entry.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { SharedModule } from '@shared/shared.module';
import { ChatConversationListComponent } from './components/chat-conversation-list/chat-conversation-list.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { ChatConversationListEntryComponent } from './components/chat-conversation-list/chat-conversation-list-entry/chat-conversation-list-entry.component';
import { ChatMessageComposerComponent } from './components/chat-message-composer/chat-message-composer.component';
import { ChatMessageComponent } from './components/chat-messages/chat-message/chat-message.component';

export const moduleDeclarations = [
  ChatPageComponent,
  ChatListEntryComponent,
  ChatMessagesComponent,
  ChatConversationListComponent,
  ChatConversationComponent,
  ChatConversationListEntryComponent,
  ChatMessageComposerComponent,
  ChatMessageComponent,
];

export const moduleImports = [
  CommonModule,
  ChatRoutingModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
    imports: [...moduleImports, ...moduleDeclarations],
})
export class ChatModule {}
