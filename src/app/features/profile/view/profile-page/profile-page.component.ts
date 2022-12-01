import { Component } from '@angular/core';
import { ProfileService } from '../../common/services/profile.service';
import { EnvironmentService } from '@core/common/environment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  constructor(
    public profileService: ProfileService,
    public environmentService: EnvironmentService,
    private router: Router
  ) {}

  editProfile(): void {
    this.router.navigate(['profile', 'edit']);
  }
}
