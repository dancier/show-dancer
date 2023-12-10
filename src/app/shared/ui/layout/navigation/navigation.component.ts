import { Component } from '@angular/core';
import { AuthStorageService } from '../../../data-access/auth/auth-storage.service';
import { LoggedOutNavigationComponent } from './logged-out-navigation/logged-out-navigation.component';
import { LoggedInNavigationComponent } from './logged-in-navigation/logged-in-navigation.component';
import { AsyncPipe, NgIf } from '@angular/common';

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
    public authStorageService: AuthStorageService // private chatState: ChatStateService // needs to be initialized from the start
  ) {}

  // ngOnDestroy(): void {
  //   // this.chatService.stopPollingForChats();
  // }
}
