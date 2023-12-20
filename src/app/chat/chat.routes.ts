import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

export const CHAT_ROUTES: Routes = [
  {
    path: ':participantId',
    component: ChatComponent,
  },
  {
    path: '',
    component: ChatComponent,
  },
];
