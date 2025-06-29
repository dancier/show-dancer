import { Component, inject } from '@angular/core';
import { AuthService } from '../../../data-access/auth/auth.service';
import { LoggedOutNavigationComponent } from './logged-out-navigation/logged-out-navigation.component';
import { LoggedInNavigationComponent } from './logged-in-navigation/logged-in-navigation.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  imports: [
    LoggedInNavigationComponent,
    LoggedOutNavigationComponent,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  authStorageService = inject(AuthService);

  // ngOnDestroy(): void {
  //   // this.chatService.stopPollingForChats();
  // }
}
