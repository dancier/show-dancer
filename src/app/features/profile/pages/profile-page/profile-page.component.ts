import { Component, OnInit } from '@angular/core';
import { ProfileService } from '@data/services/profile.service';
import { Profile } from '@data/types/profile.types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {

  constructor(public profileDataService: ProfileService) {}

}
