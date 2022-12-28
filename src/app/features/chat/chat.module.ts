import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    ChatPageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatGridListModule
  ]
})
export class ChatModule { }
