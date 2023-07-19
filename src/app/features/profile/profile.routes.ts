import {
  mapToCanActivate,
  mapToCanActivateChild,
  Routes,
} from '@angular/router';
import { InitUserNameComponent } from './edit/pages/init-user-name/init-user-name.component';
import { LoggedInGuard } from '@core/auth/guards/logged-in.guard';
import { InitPersonalDataComponent } from './edit/pages/init-personal-data/init-personal-data.component';
import { ProfilePageComponent } from '@features/profile/view/profile-page/profile-page.component';
import { InitDanceExperienceComponent } from './edit/pages/init-dance-experience/init-dance-experience.component';
import { InitPartnerDanceExperienceComponent } from './edit/pages/init-partner-dance-experience/init-partner-dance-experience.component';
import { InitProfileImageComponent } from './edit/pages/init-profile-image/init-profile-image.component';
import { DancerProfileSufficientGuard } from './common/guards/dancer-profile-sufficient.guard';
import { NarrowPageComponent } from '../../layout/narrow-page/narrow-page.component';
import { EditProfileComponent } from './edit/pages/edit-profile/edit-profile.component';
import { DancerProfileNotCreatedGuard } from './common/guards/dancer-profile-not-created.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: NarrowPageComponent,
    canActivate: mapToCanActivate([
      LoggedInGuard,
      DancerProfileSufficientGuard,
    ]),
    children: [
      {
        path: '',
        component: ProfilePageComponent,
      },
      {
        path: 'edit',
        component: EditProfileComponent,
      },
    ],
  },
  {
    path: 'initial-setup',
    component: NarrowPageComponent,
    canActivate: mapToCanActivate([LoggedInGuard]),
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
