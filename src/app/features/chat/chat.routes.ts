import { Routes } from '@angular/router';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatPageNewComponent } from './page/chat-page-new/chat-page-new.component';

export const CHAT_ROUTES: Routes = [
  {
    path: 'new',
    component: ChatPageNewComponent,
  },
  {
    path: ':participantId',
    component: ChatPageComponent,
  },
  {
    path: '',
    component: ChatPageComponent,
  },
];
