import { Component, inject } from '@angular/core';
import { OwnProfileService } from '@shared/data-access/profile/own-profile.service';
import { EnvironmentService } from '@shared/data-access/environment.service';
import { Router } from '@angular/router';
import { DisplayDanceRolePipe } from '../../util/pipes/display-dance-role.pipe';
import { DisplayDanceLevelPipe } from '../../util/pipes/display-dance-level.pipe';
import { DisplayGenderPipe } from '../../util/pipes/display-gender.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    AsyncPipe,
    DisplayGenderPipe,
    DisplayDanceLevelPipe,
    DisplayDanceRolePipe,
  ],
})
export class ProfilePageComponent {
  profileService = inject(OwnProfileService);
  environmentService = inject(EnvironmentService);
  private router = inject(Router);

  editProfile(): void {
    this.router.navigate(['profile', 'edit']);
  }
}
