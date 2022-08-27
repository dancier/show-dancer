import { Component } from '@angular/core';
import { ProfileDataService } from '@data/services/profile-data.service';
import { Profile } from '@data/types/profile.types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {

  constructor(public profileDataService: ProfileDataService) {}
}
