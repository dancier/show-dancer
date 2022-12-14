import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatRoutingModule } from './chat-routing.module';
import { PartnerNamePipe } from './common/pipes/partner-name.pipe';
import { PartnerPipe } from './common/pipes/partner.pipe';
import { PartnerCityPipe } from './common/pipes/partner-city.pipe';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ChatPageComponent,
    PartnerCityPipe,
    PartnerNamePipe,
    PartnerPipe
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatGridListModule
  ]
})
export class ChatModule { }
