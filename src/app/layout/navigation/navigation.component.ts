import { Component, OnDestroy } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { ChatService } from '@features/chat/common/services/chat.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnDestroy {
  constructor(
    public authStorageService: AuthStorageService,
    private chatService: ChatService // needs to be initialized from the start
  ) {}

  // ngOnDestroy(): void {
  //   // this.chatService.stopPollingForChats();
  // }
}
