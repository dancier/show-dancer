import { Component } from '@angular/core';
import { ProfileService } from '@shared/data-access/profile/profile.service';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { Router } from '@angular/router';
import { DisplayDanceRolePipe } from '../../util/pipes/display-dance-role.pipe';
import { DisplayDanceLevelPipe } from '../../util/pipes/display-dance-level.pipe';
import { DisplayGenderPipe } from '../../util/pipes/display-gender.pipe';
import { AgePipe } from '@shared/util/age.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    AsyncPipe,
    AgePipe,
    DisplayGenderPipe,
    DisplayDanceLevelPipe,
    DisplayDanceRolePipe,
  ],
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
