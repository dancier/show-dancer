import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatListEntryComponent } from './components/chat/chat-list-entry.component';
import { ChatMessagesComponent } from './components/chat-messages/chat-messages.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatListEntryComponent,
    ChatMessagesComponent,
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
