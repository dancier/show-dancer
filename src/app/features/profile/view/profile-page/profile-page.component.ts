import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { EnvironmentService } from '@core/common/environment.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  constructor(
    public profileService: ProfileService,
    public environmentService: EnvironmentService
  ) {}
}
