import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterUserNameComponent } from '@features/profile/pages/enter-user-name/enter-user-name.component';
import { EditPersonalDataComponent } from '@features/profile/pages/edit-personal-data/edit-personal-data.component';
import { ProfilePageComponent } from '@features/profile/pages/profile-page/profile-page.component';
import { ImageUploadComponent } from '@features/profile/pages/image-upload/image-upload.component';
import { EditAbleToDanceComponent } from '@features/profile/pages/edit-able-to-dance/edit-able-to-dance.component';
import {
  EditPartnerAbleToDanceComponent
} from '@features/profile/pages/edit-partner-able-to-dance/edit-partner-able-to-dance.component';
import { EditDanceTypeComponent } from '@features/profile/components/edit-dance-type/edit-dance-type.component';
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
import { DanceTypeComponent } from '@features/profile/components/dance-type/dance-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonalDataComponent } from '@features/profile/components/personal-data/personal-data.component';
import { ProfileRoutingModule } from '@features/profile/profile-routing.module';

@NgModule({
  declarations: [
    EnterUserNameComponent,
    EditPersonalDataComponent,
    ProfilePageComponent,
    ImageUploadComponent,
    EditAbleToDanceComponent,
    EditPartnerAbleToDanceComponent,
    EditDanceTypeComponent,
    DanceTypeComponent,
    PersonalDataComponent,
  ],
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
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatAutocompleteModule,
    ImageCropperModule,
  ]
})
export class ProfileModule { }
