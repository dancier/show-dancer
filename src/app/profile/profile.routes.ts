import {
  mapToCanActivate,
  mapToCanActivateChild,
  Routes,
} from '@angular/router';
import { InitUserNameComponent } from './feature/initial-setup/init-user-name/init-user-name.component';
import { InitPersonalDataComponent } from './feature/initial-setup/init-personal-data/init-personal-data.component';
import { InitDanceExperienceComponent } from './feature/initial-setup/init-dance-experience/init-dance-experience.component';
import { InitPartnerDanceExperienceComponent } from './feature/initial-setup/init-partner-dance-experience/init-partner-dance-experience.component';
import { InitProfileImageComponent } from './feature/initial-setup/init-profile-image/init-profile-image.component';
import { DancerProfileSufficientGuard } from './util/dancer-profile-sufficient.guard';
import { NarrowPageComponent } from '@shared/ui/layout/narrow-page/narrow-page.component';
import { EditProfileComponent } from './feature/edit-profile/edit-profile.component';
import { DancerProfileNotCreatedGuard } from './util/dancer-profile-not-created.guard';
import { loggedInGuard } from '@shared/util/auth/logged-in.guard';
import { ProfileNewComponent } from './feature/profile-new.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: 'view/:participantId',
    pathMatch: 'full',
    component: ProfileNewComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: ProfileNewComponent,
    canActivate: [
      loggedInGuard,
      ...mapToCanActivate([DancerProfileSufficientGuard]),
    ],
  },
  {
    path: 'edit',
    component: NarrowPageComponent,
    canActivate: [
      loggedInGuard,
      ...mapToCanActivate([DancerProfileSufficientGuard]),
    ],
    children: [
      {
        path: '',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: 'initial-setup',
    component: NarrowPageComponent,
    canActivate: [loggedInGuard],
    canActivateChild: mapToCanActivateChild([DancerProfileNotCreatedGuard]),
    children: [
      {
        path: 'username',
        component: InitUserNameComponent,
      },
      {
        path: 'personal-info',
        component: InitPersonalDataComponent,
      },
      {
        path: 'dances-self',
        component: InitDanceExperienceComponent,
      },
      {
        path: 'dances-partner',
        component: InitPartnerDanceExperienceComponent,
      },
      {
        path: 'profile-image',
        component: InitProfileImageComponent,
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: 'username', pathMatch: 'full' },
    ],
  },
  // Fallback when no prior routes are matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
