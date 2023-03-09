import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatListEntryComponent } from './components/chat/chat-list-entry.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { SharedModule } from '@shared/shared.module';
import { ChatConversationListComponent } from './components/chat-conversation-list/chat-conversation-list.component';
import { ChatConversationComponent } from './components/chat-conversation/chat-conversation.component';
import { ChatConversationListEntryComponent } from './components/chat-conversation-list/chat-conversation-list-entry/chat-conversation-list-entry.component';

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatListEntryComponent,
    ChatMessagesComponent,
    ChatConversationListComponent,
    ChatConversationComponent,
    ChatConversationListEntryComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ChatModule {}
