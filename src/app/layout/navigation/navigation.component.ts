import { Component } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';
import { ChatService } from '@features/chat/common/services/chat.service';
import { LoggedOutNavigationComponent } from './logged-out-navigation/logged-out-navigation.component';
import { LoggedInNavigationComponent } from './logged-in-navigation/logged-in-navigation.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    LoggedInNavigationComponent,
    LoggedOutNavigationComponent,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  constructor(
    public authStorageService: AuthStorageService,
    private chatService: ChatService // needs to be initialized from the start
  ) {}

  // ngOnDestroy(): void {
  //   // this.chatService.stopPollingForChats();
  // }
}
