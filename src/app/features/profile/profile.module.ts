import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitUserNameComponent } from './edit/pages/init-user-name/init-user-name.component';
import { InitPersonalDataComponent } from './edit/pages/init-personal-data/init-personal-data.component';
import { ProfilePageComponent } from '@features/profile/view/profile-page/profile-page.component';
import { InitDanceExperienceComponent } from './edit/pages/init-dance-experience/init-dance-experience.component';
import { InitPartnerDanceExperienceComponent } from './edit/pages/init-partner-dance-experience/init-partner-dance-experience.component';
import { DanceExperienceEntryComponent } from './edit/components/dance-experience-form/dance-experience-entry/dance-experience-entry.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from '@features/profile/profile-routing.module';
import { InitProfileImageComponent } from './edit/pages/init-profile-image/init-profile-image.component';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { de } from 'date-fns/locale';
import { PersonalDataFormComponent } from './edit/components/personal-data-form/personal-data-form.component';
import { EditProfileComponent } from './edit/pages/edit-profile/edit-profile.component';
import { DanceExperienceFormComponent } from './edit/components/dance-experience-form/dance-experience-form.component';
import { DisplayGenderPipe } from './view/pipes/display-gender.pipe';
import { DisplayDanceLevelPipe } from './view/pipes/display-dance-level.pipe';
import { DisplayDanceRolePipe } from './view/pipes/display-dance-role.pipe';

@NgModule({
    imports: [
        ProfileRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatDateFnsModule,
        MatTabsModule,
        MatRadioModule,
        MatSelectModule,
        MatAutocompleteModule,
        ImageCropperModule,
        SharedModule,
        InitUserNameComponent,
        InitPersonalDataComponent,
        ProfilePageComponent,
        InitDanceExperienceComponent,
        InitPartnerDanceExperienceComponent,
        DanceExperienceEntryComponent,
        InitProfileImageComponent,
        PersonalDataFormComponent,
        EditProfileComponent,
        DanceExperienceFormComponent,
        DisplayGenderPipe,
        DisplayDanceLevelPipe,
        DisplayDanceRolePipe,
    ],
    providers: [
        {
            provide: MAT_DATE_LOCALE,
            useValue: de,
        },
    ],
})
export class ProfileModule {}
