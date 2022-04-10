import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegistrationRoutingModule } from '@features/registration/registration-routing.module';

@NgModule({
  declarations: [
    RegisterUserFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    RegistrationRoutingModule,
  ]
})
export class RegistrationModule { }
