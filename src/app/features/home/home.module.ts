import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DanceTypeComponent } from './components/dance-type/dance-type.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { EnterUserNameComponent } from './pages/enter-user-name/enter-user-name.component';
import { EditPersonalDataComponent } from './pages/edit-personal-data/edit-personal-data.component';
import { ImageUploadComponent } from './pages/image-upload/image-upload.component';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';

@NgModule({
  declarations: [
    LandingPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    TermsAndConditionsComponent,
    AboutUsComponent,
    ProfilePageComponent,
    DanceTypeComponent,
    PersonalDataComponent,
    EnterUserNameComponent,
    EditPersonalDataComponent,
    ImageUploadComponent
  ],
  imports: [
    FormsModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    FlexModule,
    MatIconModule,
    ExtendedModule,
    MatButtonModule,
    MatTabsModule,
  ],
  exports: [ImageUploadComponent]
})
export class HomeModule { }
