import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterUserNameComponent } from '@features/profile/pages/enter-user-name/enter-user-name.component';
import { LoggedInGuard } from '@core/auth/guards/logged-in.guard';
import { EditPersonalDataComponent } from '@features/profile/pages/edit-personal-data/edit-personal-data.component';
import { ProfilePageComponent } from '@features/profile/pages/profile-page/profile-page.component';
import { EditAbleToDanceComponent } from '@features/profile/pages/edit-able-to-dance/edit-able-to-dance.component';
import { EditPartnerAbleToDanceComponent } from '@features/profile/pages/edit-partner-able-to-dance/edit-partner-able-to-dance.component';
import { EditProfileImageComponent } from '@features/profile/pages/edit-profile-image/edit-profile-image.component';
import { DancerProfileSufficientGuard } from '@core/common/dancer-profile-sufficient.guard';

export const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    canActivate: [LoggedInGuard, DancerProfileSufficientGuard],
  },
  {
    path: 'initial-setup',
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'username',
        component: EnterUserNameComponent,
      },
      {
        path: 'personal-info',
        component: EditPersonalDataComponent,
      },
      {
        path: 'dances-self',
        component: EditAbleToDanceComponent,
      },
      {
        path: 'dances-partner',
        component: EditPartnerAbleToDanceComponent,
      },
      {
        path: 'profile-image',
        component: EditProfileImageComponent,
      },
      // Fallback when no prior routes are matched
      { path: '**', redirectTo: 'username', pathMatch: 'full' },
    ],
  },
  // Fallback when no prior routes are matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
