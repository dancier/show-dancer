import { Component } from '@angular/core';
import { AuthStorageService } from '@core/auth/services/auth-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent{

  constructor(public authStorageService: AuthStorageService) { }

}
