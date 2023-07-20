import { Component } from '@angular/core';
import { ProfileService } from '@shared/profile/profile.service';
import { EnvironmentService } from '@shared/common/environment.service';
import { Router } from '@angular/router';
import { DisplayDanceRolePipe } from '../pipes/display-dance-role.pipe';
import { DisplayDanceLevelPipe } from '../pipes/display-dance-level.pipe';
import { DisplayGenderPipe } from '../pipes/display-gender.pipe';
import { AgePipe } from '@shared/common/pipes/age.pipe';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

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
