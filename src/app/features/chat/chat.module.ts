import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { PartnerNamePipe } from './common/pipes/partner-name.pipe';
import { PartnerPipe } from './common/pipes/partner.pipe';
import { PartnerCityPipe } from './common/pipes/partner-city.pipe';
import { MatGridListModule } from '@angular/material/grid-list';
import { MessagesForChatPipe } from './common/pipes/messages-for-chat.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChatPageComponent,
    MessagesForChatPipe,
    PartnerCityPipe,
    PartnerNamePipe,
    PartnerPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class ChatModule { }
