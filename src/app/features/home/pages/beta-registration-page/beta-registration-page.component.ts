import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-beta-registration-page',
  templateUrl: './beta-registration-page.component.html',
  styleUrls: ['./beta-registration-page.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class BetaRegistrationPageComponent {
  constructor() {}
}
