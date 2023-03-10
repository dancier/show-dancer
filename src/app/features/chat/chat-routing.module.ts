import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './page/chat-page/chat-page.component';
import { ChatConversationListComponent } from './components/chat-conversation-list/chat-conversation-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
  },
  {
    path: 'test',
    component: ChatConversationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
