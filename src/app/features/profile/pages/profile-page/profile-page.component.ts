import { Component } from '@angular/core';
import { ProfileService } from '@features/profile/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {

  constructor(public profileDataService: ProfileService) {}

}
