import { Component, OnInit } from '@angular/core';
import { ProfileHttpService } from '@data/services/profile-http.service';
import { Profile } from '@data/types/profile.types';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profile?: Profile

  constructor(
    private profileHttpService: ProfileHttpService
  ) {
  }

  ngOnInit(): void {
    this.profileHttpService.getProfile$().subscribe(response => {
     
    })
  }

}
