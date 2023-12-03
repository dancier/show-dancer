import { Routes } from '@angular/router';
import { ChatPageComponent } from './page/chat-page/chat-page.component';

export const CHAT_ROUTES: Routes = [
  {
    path: ':participantId',
    component: ChatPageComponent,
  },
  {
    path: '',
    component: ChatPageComponent,
  },
];
